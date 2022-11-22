import {CompanyProfileType} from '@interfaces/company-profile';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';
import {useUserStore} from '@zustand/user.store';

export const useGetCompany = (
  id?: number,
  options?: Omit<
    UseQueryOptions<
      CompanyProfileResponseType | undefined,
      unknown,
      CompanyProfileResponseType,
      ['company-profile', number | undefined]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery(['company-profile', id], async () => await getCompany(id), {
    ...options,
    enabled: !!id,
  });
};

export type CompanyProfileResponseType = Awaited<ReturnType<typeof getCompany>>;
const getCompany = (id?: number) => {
  if (!id) {
    return;
  }
  return queryClient(`company-profiles/${id}?populate=*`, 'GET', {
    withToken: true,
  }).then(data => {
    const queryData = data?.data as CompanyProfileType;
    if (!queryData) {
      return;
    }
    return {
      ...queryData.attributes,
      id: queryData.id,
    };
  });
};

export const useSetCompanyMutation = () => {
  const {user} = useUserStore();
  const mutation = useMutation((data: {[key: string]: any}) =>
    queryClient('company-profiles', 'POST', {
      data: {data: {...data, registered_by: user?.id}},
      withToken: true,
    }),
  );
  return mutation;
};

export const useUpdateCompanyMutation = () => {
  const client = useQueryClient();
  const mutation = useMutation(
    (data: {[key: string]: any; id: number}) =>
      queryClient(`company-profiles/${data.id}`, 'PUT', {
        data: {data},
        withToken: true,
      }),
    {
      onSettled: () => {
        client.invalidateQueries(['company-profile']);
      },
    },
  );
  return mutation;
};
