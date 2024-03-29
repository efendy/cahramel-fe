import {Button} from '@components/ui/button';
import {
  useDeleteContract,
  useGetContract,
  useUpdateContract,
} from '@queries/use-user-contract';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {ContractForm} from './contract-form';
import {ContractFormValues} from './user-form.type';

export const UpdateContract = ({
  contractId,
  onClose,
}: {
  contractId: number;
  onClose: () => void;
}) => {
  const {register, handleSubmit, control, reset} =
    useForm<ContractFormValues>();
  const {data: contract, isLoading} = useGetContract(contractId, {
    onSuccess: data => {
      if (!data) {
        return null;
      }
      reset({
        needOffBoard: data?.offboarding_status === 'need',
        needOnBoard: data?.onboarding_status === 'need',
      });
    },
  });

  const {mutate: updateContract, isLoading: updating} = useUpdateContract({
    onSuccess: () => {
      toast.success('Data updated');
      onClose();
    },
  });
  const {mutate: deleteContract, isLoading: deleting} = useDeleteContract({
    onSuccess: () => {
      toast.success('Data deleted');
      onClose();
    },
  });

  const onSubmit = handleSubmit(data =>
    updateContract({
      ...data,
      id: contractId,
      job_title: data.job_title?.value,
      department: data.department?.value,
      reporting_to_main: data.reporting_to_main?.value,
      reporting_to_secondary: data.reporting_to_secondary?.value,
      onboarding_status: data.needOnBoard ? 'need' : 'noneed',
      offboarding_status: data.needOffBoard ? 'need' : 'noneed',
    }),
  );

  const onDelete = () => {
    if (confirm('Are you sure you want to delete this?')) {
      deleteContract(contractId);
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex center justify-center mt-4"
        aria-label="Loading..."
        role="status">
        <svg className="h-10 w-10 animate-spin" viewBox="3 3 18 18">
          <path
            className="fill-gray-200"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
          <path
            className="fill-gray-800"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
        </svg>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-5 md:col-span-3">
        <ContractForm
          contract={contract}
          control={control}
          register={register}
        />
      </div>
      <div className="flex justify-end pr-8 space-x-3">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Cancel
        </button>
        <Button
          type="button"
          onClick={onDelete}
          className="border border-amber-600 bg-slate-50 text-gray-800"
          loading={deleting}>
          Delete
        </Button>
        <Button type="submit" loading={updating}>
          Update
        </Button>
      </div>
    </form>
  );
};
