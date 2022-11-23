import {OnBoardingStepType, OnBoardingType} from '@interfaces/onboarding';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';
import {useUserContractStore} from '@zustand/user.store';

/**
 * List of OnBoardingSteps
 */
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

export type OnBoardingStepResponseType = Awaited<
  ReturnType<typeof getOnBoardingSteps>
>[number];

/**
 * One OnBoardingStep
 */
export const useGetOnBoardingStep = (
  id?: number,
  options?: Omit<
    UseQueryOptions<
      OnBoardingStepResponseType | null,
      unknown,
      OnBoardingStepResponseType,
      ['onboarding-step', number | undefined]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const result = useQuery(
    ['onboarding-step', id],
    async () => await getOnBoardingStep(id),
    {...options, enabled: !!id},
  );
  return result;
};
const getOnBoardingStep = async (id?: number) => {
  if (!id) {
    return null;
  }
  return queryClient(`onboarding-steps/${id}?populate=*`, 'GET', {
    withToken: true,
  }).then(data => {
    const queryData = data?.data as OnBoardingStepType;
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
 * Create Or Update OnBoardingStep
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

/**
 * Delete OnBoardingStep
 */
export const useDeleteOnBoardingStep = (
  options?: Omit<
    UseMutationOptions<{data: OnBoardingType}, unknown, number, unknown>,
    'mutationFn'
  >,
) => {
  const client = useQueryClient();

  return useMutation(
    (id: number) =>
      queryClient(`onboarding-steps/${id}`, 'DELETE', {
        withToken: true,
      }),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['onboarding-steps']);
      },
    },
  );
};

/**
 * List of My OnBoardingSteps
 */
export const useGetMyOnBoardingSteps = (
  onBoardId?: number,
  options?: {onSuccess?: (data: OnBoardingStepResponseType[]) => void},
) => {
  const {activeContract} = useUserContractStore();
  const departmentId = activeContract?.department?.data.id;
  return useQuery(
    ['onboarding-steps', onBoardId],
    async () => await getMyOnBoardingSteps(departmentId),
    {
      enabled: !!departmentId,
      onSuccess: options?.onSuccess,
    },
  );
};

const getMyOnBoardingSteps = async (departmentId?: number) => {
  if (!departmentId) {
    return [];
  }
  const onBoardsData = await queryClient(
    `onboardings?filters[departments]=${departmentId}`,
    'GET',
    {withToken: true},
  );
  const onBoards = onBoardsData?.data as OnBoardingType[];
  if (!onBoards || onBoards.length === 0) {
    return [];
  }
  const onBoardData = onBoards[0];
  return queryClient(
    `onboarding-steps?filters[onboarding]=${onBoardData.id}&sort=order&populate=*`,
    'GET',
    {withToken: true},
  ).then(data => {
    const onBoardSteps = data?.data as OnBoardingStepType[];
    if (!onBoardSteps || onBoardSteps.length === 0) {
      return [];
    }
    return onBoardSteps.map(x => ({
      ...x.attributes,
      id: x.id,
    }));
  });
};
