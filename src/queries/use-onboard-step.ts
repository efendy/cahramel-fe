import {OnBoardingStepType, OnBoardingType} from '@interfaces/onboarding';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';

export const useGetOnBoardingSteps = (
  onBoardId?: number,
  options?: {onSuccess?: (data: OnBoardingStepResponseType[]) => void},
) => {
  return useQuery(
    ['onboarding-steps', onBoardId],
    async () => await getOnBoardingSteps(onBoardId),
    {
      enabled: !!onBoardId,
      onSuccess: options?.onSuccess,
    },
  );
};
export type OnBoardingStepResponseType = Awaited<
  ReturnType<typeof getOnBoardingSteps>
>[number];
const getOnBoardingSteps = async (onBoardId?: number) => {
  if (!onBoardId) {
    return [];
  }
  return queryClient(
    `onboarding-steps?filters[onboarding]=${onBoardId}&sort=order&populate=*`,
    'GET',
    {withToken: true},
  ).then(data => {
    const queryData = data?.data as OnBoardingStepType[];
    if (!data?.data) {
      return [];
    }
    return queryData.map(q => ({
      ...q.attributes,
      id: q.id,
    }));
  });
};

// export type OnBoardingStepResponseType = Awaited<
//   ReturnType<typeof getOnBoardingStep>
// >;
// export const useGetOnBoarding = (id: number) => {
//   const result = useQuery(
//     ['onboarding-step', id],
//     async () => await getOnBoardingStep(id),
//   );
//   return result;
// };
// const getOnBoardingStep = async (id?: number) => {
//   if (!id) {
//     return null;
//   }
//   return queryClient(`onboardings/${id}?populate=*`, 'GET', {
//     withToken: true,
//   }).then(data => {
//     const queryData = data?.data as OnBoardingStepType;
//     if (!queryData) {
//       return null;
//     }
//     return {
//       ...queryData.attributes,
//       id: queryData.id,
//     };
//   });
// };

/**
 * For Create and Update
 */
export const useEditOnBoardingStep = (
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
        data.id ? `onboarding-steps/${data.id}` : 'onboarding-steps',
        data.id ? 'PUT' : 'POST',
        {
          data: {data},
          withToken: true,
        },
      ),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['onboarding-steps']);
      },
    },
  );
};
