import {OnBoardingType} from '@interfaces/onboarding';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';
import {useUserContractStore} from '@zustand/user.store';

export const useGetOnBoardings = () => {
  const {activeContract} = useUserContractStore();
  const companyId = activeContract?.company_profile?.data?.id;
  return useQuery(
    ['onboardings', companyId],
    async () => await getOnBoardings(companyId),
    {
      enabled: !!companyId,
    },
  );
};
const getOnBoardings = async (companyId?: number) => {
  if (!companyId) {
    return [];
  }
  return queryClient(
    `onboardings?filters[company_profile]=${companyId}&populate=*`,
    'GET',
    {withToken: true},
  ).then(data => {
    const queryData = data?.data as OnBoardingType[];
    if (!data?.data) {
      return [];
    }
    return queryData.map(q => ({
      ...q.attributes,
      id: q.id,
    }));
  });
};

export type OnBoardingResponseType = Awaited<ReturnType<typeof getOnBoarding>>;
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
 * For Create and Update
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
