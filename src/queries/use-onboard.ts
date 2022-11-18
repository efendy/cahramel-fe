import {PaginationType} from '@interfaces/common';
import {OnBoardingType} from '@interfaces/onboarding';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';
import {useUserContractStore} from '@zustand/user.store';

interface IGetOnBoardings {
  page?: number;
  pageSize?: number;
}
/**
 * List of OnBoardings
 */
export const useGetOnBoardings = (props?: IGetOnBoardings) => {
  const {activeContract} = useUserContractStore();
  const companyId = activeContract?.company_profile?.data?.id;
  return useQuery(
    ['onboardings', companyId, `page-${props?.page ?? 1}`],
    async () => await getOnBoardings({...props, companyId}),
    {
      enabled: !!companyId,
    },
  );
};
const getOnBoardings = async ({
  companyId,
  page = 1,
  pageSize = 20,
}: IGetOnBoardings & {companyId?: number}) => {
  if (!companyId) {
    return;
  }
  return queryClient(
    `onboardings?filters[company_profile]=${companyId}&populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
    'GET',
    {withToken: true},
  ).then(data => {
    const queryData = data?.data as OnBoardingType[];
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

export type OnBoardingResponseType = Awaited<ReturnType<typeof getOnBoarding>>;

/**
 * One OnBoardingStep
 */
export const useGetOnBoarding = (
  id?: number,
  options?: {onSuccess?: (data: OnBoardingResponseType) => void},
) => {
  const result = useQuery(
    ['onboarding', id],
    async () => await getOnBoarding(id),
    {enabled: !!id, onSuccess: options?.onSuccess},
  );
  return result;
};
const getOnBoarding = async (id?: number) => {
  if (!id) {
    return null;
  }
  return queryClient(`onboardings/${id}?populate=*`, 'GET', {
    withToken: true,
  }).then(data => {
    const queryData = data?.data as OnBoardingType;
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
export const useEditOnBoarding = (
  options?: Omit<
    UseMutationOptions<
      {data: OnBoardingType},
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
        data.id ? `onboardings/${data.id}` : 'onboardings',
        data.id ? 'PUT' : 'POST',
        {
          data: {data},
          withToken: true,
        },
      ),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['onboardings']);
      },
    },
  );
};
