import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useUserContractStore} from '@zustand/user.store';
import {useGetDepartments, useGetJobTitles} from '@queries/use-app-utils';
import {Button} from '@components/ui/button';
import {useEditOnBoarding, useGetOnBoarding} from '@queries/use-onboard';
import {Select} from '@components/ui/select';
import {useEditOffBoarding, useGetOffBoarding} from '@queries/use-offboard';
import {OnboardSteps} from './onboarding/onboard-steps';
import {OffboardSteps} from './offboarding/offboard-steps';

type FormValues = {
  title: string;
  description: string;
  job_titles: {label: string; value: number}[] | undefined;
  departments: {label: string; value: number}[] | undefined;
  is_activated: boolean;
};

interface IEditBoard {
  onClose: () => void;
  boardId?: number;
  type: 'onBoard' | 'offBoard';
}

export const EditBoardForm = ({onClose, boardId: id, type}: IEditBoard) => {
  console.log({id});
  const {activeContract} = useUserContractStore();
  const userRole = activeContract?.access_role;
  const companyId = activeContract?.company_profile?.data?.id;
  const [boardId, setBoardId] = useState<number | undefined>(() => id);

  const {register, handleSubmit, control, reset} = useForm<FormValues>();

  const {data: onBoarding} = useGetOnBoarding(boardId, {
    onSuccess: data => onGetSuccess(data),
    enabled: type === 'onBoard' && !!id,
  });
  const {data: offBoarding} = useGetOffBoarding(boardId, {
    onSuccess: data => onGetSuccess(data),
    enabled: type === 'offBoard' && !!id,
  });

  const onGetSuccess = (data: typeof onBoarding | typeof offBoarding) =>
    reset({
      title: data?.title,
      description: data?.description,
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

  const {data: jobTitles} = useGetJobTitles();
  const {data: departments} = useGetDepartments();

  const {mutate: editOnBoard, isLoading: onBoardLoading} = useEditOnBoarding({
    onSuccess: ({data}) => onEditSuccess(data.id),
  });
  const {mutate: editOffBoard, isLoading: offBoardLoading} = useEditOffBoarding(
    {
      onSuccess: ({data}) => onEditSuccess(data.id),
    },
  );

  const onEditSuccess = (id: number) => {
    toast.success(`${id ? 'Updated' : 'Created'} successfully`);
    setBoardId(id);
  };

  const onSubmit = handleSubmit(data => {
    const uploadData = {
      ...data,
      job_titles: data.job_titles?.map(x => x.value),
      departments: data.departments?.map(x => x.value),
      company_profile: companyId,
      id,
    };
    // console.log('upp', type, uploadData);
    if (type === 'onBoard') {
      editOnBoard(uploadData);
    } else {
      editOffBoard(uploadData);
    }
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
            />
          </div>
          <div className="col-span-full relative flex items-center">
            <div className="flex h-5">
              <input
                {...register('is_activated')}
                id="board"
                aria-describedby="board"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
            </div>

            <label
              htmlFor="board"
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
          <Button type="submit" loading={onBoardLoading || offBoardLoading}>
            {id ? 'Update' : 'Create'}{' '}
            {type === 'onBoard' ? 'OnBoard' : 'OffBoard'}
          </Button>
        </div>
      </form>
      {!boardId ? null : type === 'onBoard' ? (
        <OnboardSteps onBoardId={boardId} />
      ) : (
        <OffboardSteps offBoardId={boardId} />
      )}
    </div>
  );
};
