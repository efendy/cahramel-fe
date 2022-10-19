import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@utils/api-client"
import { useGetProfile } from "./use-user"


export const useSetCompanyMutation = () => {
    const { data: user } = useGetProfile();

    const mutation = useMutation(
        (data: { [key: string]: any }) => queryClient('company-profiles', 'POST', {
            data: { data: { ...data, registered_by: user?.id } },
            withToken: true
        }),
    )
    return mutation
}
