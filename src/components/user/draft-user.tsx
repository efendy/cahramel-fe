import {Button} from '@components/ui/button';
import {useDraftUserContract, useGetContract} from '@queries/use-user-contract';
import {useUserContractStore} from '@zustand/user.store';
import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {ContractForm} from './contract-form';
import {ContractFormValues, UserFormValues} from './user-form.type';

type FormValues = UserFormValues & ContractFormValues;

export const DraftUser = ({
  contractId,
  onClose,
}: {
  contractId: number;
  onClose: () => void;
}) => {
  const clickedButton = useRef<string | null>(null);
  const {register, handleSubmit, control, reset} = useForm<FormValues>();
  const {activeContract} = useUserContractStore();

  const {data: contract} = useGetContract(contractId, {
    onSuccess: data => {
      if (!data) {
        return null;
      }
      const userProfile = data?.user_profile?.data?.attributes;
      reset({
        access_role: data?.access_role,
        date_end: data.date_end,
        date_start: data.date_start,
        department: data.department?.data
          ? {
              label: data.department.data?.attributes?.title,
              value: data.department.data?.id,
            }
          : undefined,
        email: data.email_address,
        email_address: userProfile?.email_address,
        employee_id: data.employee_id,
        first_name: userProfile?.first_name,
        last_name: userProfile?.last_name,
        job_title: data.job_title?.data
          ? {
              label: data.job_title.data.attributes.title,
              value: data.job_title.data.id,
            }
          : undefined,
        needOffBoard: data?.offboarding_status === 'need',
        needOnBoard: data?.onboarding_status === 'need',
        phone: userProfile?.phone_number,
        reporting_to_main: data.reporting_to_main?.data
          ? {
              label: data.reporting_to_main.data?.attributes?.email_address,
              value: data.reporting_to_main.data.id,
            }
          : undefined,
        reporting_to_secondary: data.reporting_to_secondary?.data
          ? {
              label:
                data.reporting_to_secondary.data?.attributes?.email_address,
              value: data.reporting_to_secondary.data.id,
            }
          : undefined,
      });
    },
  });

  const {mutate: draftUser, isLoading} = useDraftUserContract({
    onSuccess: () => {
      toast.success('Data saved successfully');
      onClose();
    },
    onError: () => toast.error('Something went wrong'),
  });

  const onSubmit = handleSubmit((data, e) => {
    if (!activeContract?.company_profile?.data) {
      return;
    }
    const nativeEvent = e?.nativeEvent as unknown as {
      submitter: {id?: string};
    };
    const id = nativeEvent.submitter?.id;

    const {email, employee_id, date_start, date_end, access_role} = data;
    const uploadData = {
      profile: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email_address,
        phone: data.phone,
      },
      contract: {
        employee_id,
        job_title: data.job_title?.value,
        reporting_to_main: data.reporting_to_main?.value,
        reporting_to_secondary: data.reporting_to_secondary?.value,
        department: data.department?.value,
        date_start,
        date_end,
        onboarding_status: data.needOnBoard ? 'need' : 'noneed',
        offboarding_status: data.needOffBoard ? 'need' : 'noneed',
        email,
        access_role,
        company_profile: activeContract?.company_profile?.data?.id,
      },
      method: id === 'confirm' ? 'confirm' : 'save',
      id: contractId ? contractId : undefined,
    };
    clickedButton.current = id ?? null;
    // console.log('uploading', uploadData);
    draftUser(uploadData);
  });

  return (
    <form id="draft-user-form" onSubmit={onSubmit} className="pb-8 space-y-6">
      <div className="sm:px-4 py-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="col-span-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  {...register('first_name')}
                  type="text"
                  required
                  id="first-name"
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  {...register('last_name')}
                  type="text"
                  required
                  id="last-name"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  {...register('email_address')}
                  type="text"
                  required
                  id="email-address"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="phone-no"
                  className="block text-sm font-medium text-gray-700">
                  Phone number (optional)
                </label>
                <input
                  {...register('phone')}
                  type="text"
                  id="phone-no"
                  autoComplete="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 h-[2px] w-full" />
      <div className="sm:px-4 py-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="col-span-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Contract Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Decide which communications you'd like to receive and how.
            </p>
          </div>
          <div className="mt-5 md:col-span-3 md:mt-0 ">
            <ContractForm
              contract={contract}
              control={control}
              register={register}
            />
          </div>
        </div>
      </div>

      <div className="flex md:flex-row justify-end pr-8  md:space-x-3 flex-col space-y-3 md:space-y-0">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Cancel
        </button>
        <Button
          id="draft"
          type="submit"
          className="border border-amber-600 bg-slate-50 text-gray-800"
          loading={clickedButton.current === 'draft' && isLoading}>
          Save as draft
        </Button>
        <Button
          id="confirm"
          type="submit"
          loading={clickedButton.current === 'confirm' && isLoading}>
          Confirm and send out invitation
        </Button>
      </div>
    </form>
  );
};
