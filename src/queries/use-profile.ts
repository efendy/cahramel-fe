import {UserProfileType} from '@interfaces/user-profile';
import {
  useMutation,  
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';
import {useUserStore} from '@zustand/user.store';

export const useGetProfile = (
  id?: number,
  options?: Omit<
    UseQueryOptions<
      UserProfileResponseType | undefined,
      unknown,
      UserProfileResponseType,
      ['user-profile', number | undefined]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery(['user-profile', id], async () => await getProfile(id), {
    ...options,
    enabled: !!id,
  });
};

export type UserProfileResponseType = Awaited<ReturnType<typeof getProfile>>;
const getProfile = (id?: number) => {
  if (!id) {
    return;
  }
  return queryClient(`user-profiles/${id}?populate=*`, 'GET', {
    withToken: true,
  }).then(data => {
    const queryData = data?.data as UserProfileType;
    if (!queryData) {
      return;
    }
    return {
      ...queryData.attributes,
      id: queryData.id,
    };
  });
};

export const useSetProfileMutation = () => {
  const {user} = useUserStore();
  const mutation = useMutation((data: {[key: string]: any}) =>
    queryClient('user-profiles', 'POST', {
      data: {data: {...data, registered_by: user?.id}},
      withToken: true,
    }),
  );
  return mutation;
};

export const useUpdateProfileMutation = () => {
  const client = useQueryClient();
  const mutation = useMutation(
    (data: {[key: string]: any; id: number}) =>
      queryClient(`user-profiles/${data.id}`, 'PUT', {
        data: {data},
        withToken: true,
      }),
    {
      onSettled:()=>{
        client.invalidateQueries(['user-profile']);
      },
    },
  );
  return mutation;
};
