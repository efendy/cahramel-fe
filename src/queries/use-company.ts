import {useMutation} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';
import {useUserStore} from '@zustand/user.store';

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
  const mutation = useMutation((data: {[key: string]: any; id: number}) =>
    queryClient(`company-profiles/${data.id}`, 'PUT', {
      data: {data},
      withToken: true,
    }),
  );
  return mutation;
};
