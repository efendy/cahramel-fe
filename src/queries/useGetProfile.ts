import { UserProfileType } from "@interfaces/user-profile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




export const useGetProfile = () => {
    const result = useQuery<UserProfileType>(
        ['user'],
        async () => await axios.get('/api/user/profile').then(({ data }) => data),
    );
    return result
};
