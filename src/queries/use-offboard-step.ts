import {OffBoardingStepType, OffBoardingType} from '@interfaces/offboarding';
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
 * List of OffBoardingSteps
 */
export const useGetOffBoardingSteps = (
  offBoardId?: number,
  options?: {onSuccess?: (data: OffBoardingStepResponseType[]) => void},
) => {
  return useQuery(
    ['offboarding-steps', offBoardId],
    async () => await getOffBoardingSteps(offBoardId),
    {
      enabled: !!offBoardId,
      onSuccess: options?.onSuccess,
    },
  );
};

const getOffBoardingSteps = async (offBoardId?: number) => {
  if (!offBoardId) {
    return [];
  }
  return queryClient(
    `offboarding-steps?filters[offboarding]=${offBoardId}&sort=order&populate=*`,
    'GET',
    {withToken: true},
  ).then(data => {
    const queryData = data?.data as OffBoardingStepType[];
    if (!data?.data) {
      return [];
    }
    return queryData.map(q => ({
      ...q.attributes,
      id: q.id,
    }));
  });
};

export type OffBoardingStepResponseType = Awaited<
  ReturnType<typeof getOffBoardingSteps>
>[number];

/**
 * One OffBoardingStep
 */
export const useGetOffBoardingStep = (
  id?: number,
  options?: Omit<
    UseQueryOptions<
      OffBoardingStepResponseType | null,
      unknown,
      OffBoardingStepResponseType,
      ['offboarding-step', number | undefined]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const result = useQuery(
    ['offboarding-step', id],
    async () => await getOffBoardingStep(id),
    {...options, enabled: !!id},
  );
  return result;
};
const getOffBoardingStep = async (id?: number) => {
  if (!id) {
    return null;
  }
  return queryClient(`offboarding-steps/${id}?populate=*`, 'GET', {
    withToken: true,
  }).then(data => {
    const queryData = data?.data as OffBoardingStepType;
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
 * Create Or Update OffBoardingStep
 */
export const useEditOffBoardingStep = (
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
        data.id ? `offboarding-steps/${data.id}` : 'offboarding-steps',
        data.id ? 'PUT' : 'POST',
        {
          data: {data},
          withToken: true,
        },
      ),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['offboarding-steps']);
      },
    },
  );
};

/**
 * Delete OffBoardingStep
 */
export const useDeleteOffBoardingStep = (
  options?: Omit<
    UseMutationOptions<{data: OffBoardingType}, unknown, number, unknown>,
    'mutationFn'
  >,
) => {
  const client = useQueryClient();

  return useMutation(
    (id: number) =>
      queryClient(`offboarding-steps/${id}`, 'DELETE', {
        withToken: true,
      }),
    {
      ...options,
      onSettled: () => {
        client.invalidateQueries(['offboarding-steps']);
      },
    },
  );
};

/**
 * List of My OffBoardingSteps
 */
export const useGetMyOffBoardingSteps = (
  offBoardId?: number,
  options?: {onSuccess?: (data: OffBoardingStepResponseType[]) => void},
) => {
  const {activeContract} = useUserContractStore();
  const departmentId = activeContract?.department?.data.id;
  return useQuery(
    ['offboarding-steps', offBoardId],
    async () => await getMyOffBoardingSteps(departmentId),
    {
      enabled: !!departmentId,
      onSuccess: options?.onSuccess,
    },
  );
};

const getMyOffBoardingSteps = async (departmentId?: number) => {
  if (!departmentId) {
    return [];
  }
  const offBoardsData = await queryClient(
    `offboardings?filters[departments]=${departmentId}`,
    'GET',
    {withToken: true},
  );
  const offBoards = offBoardsData?.data as OffBoardingType[];
  if (!offBoards || offBoards.length === 0) {
    return [];
  }
  const offBoardData = offBoards[0];
  return queryClient(
    `offboarding-steps?filters[offboarding]=${offBoardData.id}&sort=order&populate=*`,
    'GET',
    {withToken: true},
  ).then(data => {
    const offBoardSteps = data?.data as OffBoardingStepType[];
    if (!offBoardSteps || offBoardSteps.length === 0) {
      return [];
    }
    return offBoardSteps.map(x => ({
      ...x.attributes,
      id: x.id,
    }));
  });
};
