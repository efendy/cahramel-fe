import { DepartmentType } from "@interfaces/department";
import { JobTitleType } from "@interfaces/job-title";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/api-client";

export const useGetJobTitles = () => {
    const result = useQuery(
        ['job-titles'],
        async () => await getJobTitles(),
    );
    return result
};

const getJobTitles = async () => {
    return queryClient('job-titles', 'GET', { withToken: true }).then(data => {
        const queryData = data?.data as JobTitleType[];
        if (!data?.data) {
            return []
        }
        return queryData.map(q => ({
            ...q.attributes,
            id: q.id
        }))
    })
}


export const useGetDepartments = () => {
    const result = useQuery(
        ['departments'],
        async () => await getDepartments(),
    );
    return result
};

const getDepartments = async () => {
    return queryClient('departments', 'GET', { withToken: true }).then(data => {
        const queryData = data?.data as DepartmentType[];
        if (!data?.data) {
            return []
        }
        return queryData.map(q => ({
            ...q.attributes,
            id: q.id
        }))
    })
}