import {IndustryType} from '@interfaces/industry-type';
import {useQuery} from '@tanstack/react-query';
import {queryClient} from '@utils/api-client';

export const useGetIndustryType = () => {
  const result = useQuery(['industry-type'], async () => await getIndustries());
  return result;
};

async function getIndustries() {
  return queryClient('industry-types', 'GET', {withToken: true}).then(data => {
    const queryData = data?.data as IndustryType[];
    if (!queryData || queryData.length === 0) {
      return [];
    }
    return queryData.map(d => ({
      ...d.attributes,
      id: d.id,
    }));
  });
}
