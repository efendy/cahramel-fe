import { UserProfileType } from "@interfaces/user-profile";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/api-client";

export const useGetProfile = () => {
    const result = useQuery(
        ['user'],
        async () => await getUser(),
        {
            keepPreviousData: true,
        }
    );
    return result
};


const getUser = async () => {
    return queryClient('user-profiles/me?populate[]=user_contracts.company_profile&populate[]=user_contracts.company_profile.image_profile&populate[]=user_contracts.company_profile.industry_type&populate[]=image_profile', 'GET', { withToken: true }).then(data => {
        const queryData = data as UserProfileType;
        const attributes = queryData.attributes;
        let user_contract = null;
        if (attributes?.user_contracts?.data && attributes?.user_contracts?.data?.length > 0) {
            const contract = attributes?.user_contracts?.data[0];
            const contractA = contract.attributes;
            const companyProfile = {
                ...contractA.company_profile.data?.attributes,
                id: contractA.company_profile.data?.id
            }

            user_contract = {
                ...contract.attributes,
                id: contract.id,
                company_profile: companyProfile
            }
        }
        return {
            ...attributes,
            user_contract,
            id: queryData.id
        };
    })
}