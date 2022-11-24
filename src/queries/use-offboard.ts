import {PaginationType} from '@interfaces/common';
import {OffBoardingType} from '@interfaces/offboarding';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';
import {useUserContractStore} from '@zustand/user.store';

interface IGetOffBoardings {
  page?: number;
  pageSize?: number;
}
/**
 * List of OffBoardings
 */
export const useGetOffBoardings = (props?: IGetOffBoardings) => {
  const {activeContract} = useUserContractStore();
  const companyId = activeContract?.company_profile?.data?.id;
  return useQuery(
    ['offboardings', companyId, `page-${props?.page ?? 1}`],
    async () => await getOffBoardings({...props, companyId}),
    {
      enabled: !!companyId,
    },
  );
};
const getOffBoardings = async ({
  companyId,
  page = 1,
  pageSize = 20,
}: IGetOffBoardings & {companyId?: number}) => {
  if (!companyId) {
    return;
  }
  return queryClient(
    `offboardings?filters[company_profile]=${companyId}&populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
    'GET',
    {withToken: true},
  ).then(data => {
    const queryData = data?.data as OffBoardingType[];
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

export type OffBoardingResponseType = Awaited<
  ReturnType<typeof getOffBoarding>
>;

/**
 * One OffBoardingStep
 */
export const useGetOffBoarding = (
  id?: number,
  options?: Omit<
    UseQueryOptions<
      OffBoardingResponseType | null,
      unknown,
      OffBoardingResponseType | null,
      ['offboarding', number | undefined]
    >,
    'queryKey'
  >,
) => {
  const result = useQuery(
    ['offboarding', id],
    async () => await getOffBoarding(id),
    {enabled: !!id, ...options},
  );
  return result;
};
const getOffBoarding = async (id?: number) => {
  if (!id) {
    return null;
  }
  return queryClient(`offboardings/${id}?populate=*`, 'GET', {
    withToken: true,
  }).then(data => {
    const queryData = data?.data as OffBoardingType;
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
 * Create Or Update OnBarding
 */
export const useEditOffBoarding = (
  options?: Omit<
    UseMutationOptions<
      {data: OffBoardingType},
      unknown,
      {[key: string]: any},
      unknown
    >,
    'mutationFn'
  >,
) => {
  const client = useQueryClient();

  return useMutation(
    (data: {[key: string]: any; id?: number}) =>
      queryClient(
        data.id ? `offboardings/${data.id}` : 'offboardings',
        data.id ? 'PUT' : 'POST',
        {
          data: {data},
          withToken: true,
        },
      ),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['offboardings']);
      },
    },
  );
};
