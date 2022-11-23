import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';
import {getSession} from 'next-auth/react';
import {UserContractType} from '@interfaces/user-contract';
import {useUserContractStore} from '@zustand/user.store';
import {PaginationType} from '@interfaces/common';

interface IGetContracts {
  page?: number;
  pageSize?: number;
}
/**
 * List of User's Contracts
 */
export const useGetContracts = (props?: IGetContracts) => {
  const {activeContract} = useUserContractStore();
  const companyId = activeContract?.company_profile?.data?.id;
  const result = useQuery(
    ['user-contracts', companyId, `page-${props?.page ?? 1}`],
    async () => await getContracts({...props, companyId}),
  );
  return result;
};

const getContracts = async ({
  companyId,
  page = 1,
  pageSize = 20,
}: IGetContracts & {companyId?: number}) => {
  if (!companyId) {
    return;
  }
  return queryClient(
    `user-contracts?filters[company_profile]=${companyId}&filters[user_profile][id][$notNull]=true&populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
    'GET',
    {withToken: true},
  ).then(data => {
    const queryData = data?.data as UserContractType[];

    return {
      data:
        queryData?.map(q => ({
          ...q.attributes,
          id: q.id,
        })) ?? [],
      pagination: data?.meta?.pagination as PaginationType | undefined,
    };
  });
};

/**
 * One User's Contract
 */
export const useGetContract = (
  id?: number,
  options?: Omit<
    UseQueryOptions<
      ContractType | null,
      unknown,
      ContractType,
      ['user-contract', number | undefined]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  console.log('eeee', options?.enabled);
  const result = useQuery(
    ['user-contract', id],
    async () => await getContract(id),
    {enabled: !!id, ...options},
  );
  return result;
};

export type ContractType = Awaited<ReturnType<typeof getContract>>;

const getContract = async (id?: number) => {
  if (!id) {
    return null;
  }
  return queryClient(`user-contracts/${id}?populate=*`, 'GET', {
    withToken: true,
  }).then(data => {
    const queryData = data?.data as UserContractType;
    if (!queryData) {
      return null;
    }
    return {
      ...queryData.attributes,
      id: queryData.id,
    };
  });
};

/**
 * Update User's Contract
 */

type UpdateOptionType = Omit<
  UseMutationOptions<any, unknown, {[key: string]: any}, unknown>,
  'mutationFn'
>;
export const useUpdateContract = (options?: UpdateOptionType) => {
  const client = useQueryClient();
  return useMutation(
    (data: {[key: string]: any; id: number}) =>
      queryClient(`user-contracts/${data.id}`, 'PUT', {
        data: {data},
        withToken: true,
      }),
    {
      ...options,
      onSettled: data => {
        client.invalidateQueries(['user-contract', data.id]);
      },
    },
  );
};
export const useUpdateMyContract = (options?: UpdateOptionType) => {
  const client = useQueryClient();
  const {activeContract} = useUserContractStore();
  return useMutation(
    (data: {[key: string]: any}) =>
      queryClient(`user-contracts/${activeContract?.id}`, 'PUT', {
        data: {data},
        withToken: true,
      }),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['user-contracts']);
      },
    },
  );
};

/**
 * Delete User's Contract
 */
export const useDeleteContract = (
  options?: Omit<
    UseMutationOptions<any, unknown, number, unknown>,
    'mutationFn'
  >,
) => {
  const client = useQueryClient();
  return useMutation(
    (id: number) =>
      queryClient(`user-contracts/${id}`, 'DELETE', {
        withToken: true,
      }),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['user-contracts']);
      },
    },
  );
};

/**
 * Save or confirm User's Contract
 */
export const useDraftUserContract = (
  options: Omit<
    UseMutationOptions<any, unknown, {[key: string]: any}, unknown>,
    'mutationFn'
  >,
) => {
  const client = useQueryClient();
  return useMutation(
    (data: {[key: string]: any; method: 'save' | 'confirm' | string}) =>
      queryClient(`user-contracts/draft/${data.method}`, 'POST', {
        data: {data},
        withToken: true,
      }),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['user-contracts']);
      },
    },
  );
};

/**
 * Check invite and link user
 */
export const useGetContractInvite = (code?: string) => {
  return useQuery(
    ['contract-invite', code],
    async () => (code ? await getContractInvite(code) : null),
    {
      onSuccess: async data => {
        if (!code || !data) return;
        const session = await getSession();
        if (session?.accessToken) {
          const linkData = await linkUser(code);
          if (linkData?.data) {
            window.location.replace('/app');
          }
          return;
        }
        if (data?.users?.length === 0) {
          const params = `first_name=${data?.first_name}&last_name=${data?.last_name}&email=${data?.email_address}&code=${code}`;
          window.location.replace(`/auth/register?${params}`);
          return;
        }
        window.location.replace(`/auth/login?code=${code}`);
      },
    },
  );
};

const getContractInvite = async (code: string) => {
  return queryClient(`user-contracts/invite/${code}`, 'GET', {
    withToken: true,
  }).then(data => {
    const queryData = data?.data as InviteContractType;
    return {...queryData.attributes, id: queryData.id};
  });
};

export const linkUser = (code: string) => {
  return queryClient(`user-contracts/link`, 'POST', {
    withToken: true,
    data: {
      data: {
        code,
      },
    },
  });
};

export const linkPublicUser = (data: {[key: string]: any}) => {
  return queryClient(`user-profiles/link`, 'POST', {
    data: {
      data,
    },
  });
};

interface Attributes {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  users: {
    id: number;
    email: string;
  }[];
}

interface InviteContractType {
  id: number;
  attributes: Attributes;
}
