import {UserProfileType} from '@interfaces/user-profile';
import {useQuery} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';

export const useGetProfile = ({
  enabled,
  onSuccess,
}: {
  enabled?: boolean;
  onSuccess?: (data: ProfileResponseType) => void;
}) => {
  return useQuery(['user-profile'], async () => await getUserProfile(), {
    enabled,
    onSuccess,
  });
};

export type ProfileResponseType =
  | Awaited<ReturnType<typeof getUserProfile>>
  | undefined;

const getUserProfile = async () => {
  return queryClient(
    'user-profiles/me?populate[]=user_contracts.company_profile&populate[]=user_contracts.company_profile.image_profile&populate[]=user_contracts.company_profile.industry_type&populate[]=image_profile&populate[]=user_contracts.department',
    'GET',
    {withToken: true},
  ).then(data => {
    const queryData = data as UserProfileType;
    const attributes = queryData.attributes;
    // let user_contracts = null;
    const contracts = attributes?.user_contracts?.data;
    return {
      ...attributes,
      user_contracts: contracts
        ? contracts.map(x => ({
            ...x.attributes,
            id: x.id,
          }))
        : undefined,
      id: queryData.id,
    };
  });
};
