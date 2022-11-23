import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useUserContractStore} from '@zustand/user.store';
import {useGetDepartments, useGetJobTitles} from '@queries/use-app-utils';
import {Button} from '@components/ui/button';
import {useEditOnBoarding, useGetOnBoarding} from '@queries/use-onboard';
import {OnboardSteps} from './onboard-steps';
import {Select} from '@components/ui/select';

type FormValues = {
  title: string;
  description: string;
  job_titles: {label: string; value: number}[] | undefined;
  departments: {label: string; value: number}[] | undefined;
  is_activated: boolean;
};

interface IEditOnBoard {
  onClose: () => void;
  onBoardId?: number;
}

export const EditOnBoardForm = ({onClose, onBoardId: id}: IEditOnBoard) => {
  const {activeContract} = useUserContractStore();
  const userRole = activeContract?.access_role;
  const companyId = activeContract?.company_profile?.data?.id;
  const [onBoardId, setOnBoardId] = useState<number | undefined>(() => id);

  const {register, handleSubmit, control, reset} = useForm<FormValues>();

  const {data: onBoarding} = useGetOnBoarding(onBoardId, {
    onSuccess: data => {
      reset({
        job_titles: data?.job_titles?.data?.map(x => ({
          label: x.attributes.title,
          value: x.id,
        })),
        departments: data?.departments?.data?.map(x => ({
          label: x.attributes.title,
          value: x.id,
        })),
        is_activated: data?.is_activated,
      });
    },
  });

  const {data: jobTitles} = useGetJobTitles();
  const {data: departments} = useGetDepartments();
  const {mutate: editOnBoard, isLoading} = useEditOnBoarding({
    onSuccess: ({data}) => {
      toast.success(`${onBoarding?.id ? 'Updated' : 'Created'} successfully`);
      setOnBoardId(data.id);
    },
  });

  const onSubmit = handleSubmit(data => {
    const uploadData = {
      ...data,
      job_titles: data.job_titles?.map(x => x.value),
      departments: data.departments?.map(x => x.value),
      company_profile: companyId,
      id,
    };
    // console.log('upp', uploadData);
    editOnBoard(uploadData);
  });

  if (!userRole || userRole === 'user') {
    return null;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register('title')}
              type="text"
              required
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              defaultValue={onBoarding?.title}
            />
          </div>
          <div className="hidden sm:block sm:col-span-3" />
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="job-title"
              className="block text-sm font-medium text-gray-700">
              Job title
            </label>
            <Controller
              name="job_titles"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  isMulti
                  id="job-title"
                  defaultValue={onBoarding?.job_titles?.data?.map(x => ({
                    label: x.attributes.title,
                    value: x.id,
                  }))}
                  options={jobTitles?.map(x => ({value: x.id, label: x.title}))}
                />
              )}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <Controller
              name="departments"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  id="department"
                  isMulti
                  defaultValue={onBoarding?.departments?.data?.map(x => ({
                    label: x.attributes.title,
                    value: x.id,
                  }))}
                  options={departments?.map(x => ({
                    value: x.id,
                    label: x.title,
                  }))}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description')}
              required
              rows={3}
              id="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              defaultValue={onBoarding?.description}
            />
          </div>
          <div className="col-span-full relative flex items-center">
            <div className="flex h-5">
              <input
                {...register('is_activated')}
                id="onboard"
                aria-describedby="onboard"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
            </div>

            <label
              htmlFor="onboard"
              className="font-medium text-gray-700 text-sm ml-3">
              Activated?
            </label>
          </div>
        </div>
        <div className="flex justify-end pr-8 space-x-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
            Cancel
          </button>
          <Button type="submit" loading={isLoading}>
            {id ? 'Update' : 'Create'} OnBoard
          </Button>
        </div>
      </form>
      {onBoardId ? <OnboardSteps onBoardId={onBoardId} /> : null}
    </div>
  );
};
