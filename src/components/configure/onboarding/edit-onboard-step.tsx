import {Controller, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useUserContractStore} from '@zustand/user.store';
import Select from 'react-select';
import {Button} from '@components/ui/button';
import {
  OnBoardingStepResponseType,
  useEditOnBoardingStep,
} from '@queries/use-onboard-step';
import {OnBoardStepTypes} from '@interfaces/onboarding';
import {TypeOptions} from '@constants/onboard';
// import {useCreateOnBoarding} from '@queries/use-onboard';
import SimpleMDE from 'react-simplemde-editor';

type FormValues = {
  order: number;
  image: Blob[];
  video_url: string;
  type: {label: string; value: OnBoardStepTypes} | undefined;
  document: Blob[];
  content: string;
};

interface IEditOnBoardStep {
  step?: number;
  onBardStep?: OnBoardingStepResponseType;
}

export const EditOnBoardStep = ({onBardStep, step = 0}: IEditOnBoardStep) => {
  const {activeContract} = useUserContractStore();
  const userRole = activeContract?.access_role;
  const companyId = activeContract?.company_profile?.data?.id;
  const {register, handleSubmit, control, watch, getValues, getFieldState} =
    useForm<FormValues>();
  const selectType = watch('type')?.value;
  const notInput =
    !selectType ||
    selectType === 'content' ||
    selectType === 'user_profile_upload_image' ||
    selectType === 'user_profile_update_data' ||
    selectType === 'user_document';

  const activeTypeOption = TypeOptions.find(x => x.value === onBardStep?.type);
  console.log('activeTypeOption', onBardStep);

  // console.log('!selectType', !selectType, notInput);
  // const {data: onboardingStep, isLoading} = useGetOnBoardingSteps(
  //   onBardStep?.id,
  // );
  const {mutate: editOnBoardStep, isLoading} = useEditOnBoardingStep();

  //   const {data: onBoarding} = useGetOnBoarding(onBoardId, {
  //     onSuccess: data => {
  //       reset({
  //         job_titles: data?.job_titles?.data?.map(x => ({
  //           label: x.attributes.title,
  //           value: x.id,
  //         })),
  //         departments: data?.departments?.data?.map(x => ({
  //           label: x.attributes.title,
  //           value: x.id,
  //         })),
  //       });
  //     },
  //   });

  //   const {mutate: create, isLoading} = useCreateOnBoarding({
  //     onSuccess: ({data}) => {
  //       toast.success('Created successfully');
  //       console.log('data', data.id, data);
  //     },
  //   });

  if (!userRole || userRole === 'user') {
    return null;
  }

  const onSubmit = handleSubmit(data => {
    console.log('step', data, onBardStep, step);
    // const uploadData = {
    //   ...data,
    //   job_title: data.job_title?.value,
    //   department: data.job_title?.value,
    //   company_profile: companyId,
    // };
    // create(uploadData);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  id="type"
                  className="mt-1"
                  defaultValue={activeTypeOption}
                  options={TypeOptions}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <div className="mt-1">
              <Controller
                name="content"
                control={control}
                render={({field}) => (
                  <SimpleMDE {...field} value={onBardStep?.content} />
                )}
              />
            </div>
          </div>
          {!notInput ? (
            <div className="col-span-6">
              <label
                htmlFor="notInput"
                className="block text-sm font-medium text-gray-700">
                {selectType === 'video_url'
                  ? 'Enter video url'
                  : 'Select a file'}
              </label>
              <div className="mt-1">
                <input
                  {...register(selectType)}
                  required
                  type={selectType === 'video_url' ? 'text' : 'file'}
                  id="notInput"
                  className="block w-full rounded-md border-gray-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm file:text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm"
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex justify-end pr-8 space-x-3 mt-4">
          {/* <button
            type="button"
            // onClick={onClose}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
            Cancel
          </button> */}
          <Button type="submit" loading={isLoading}>
            Create Step
          </Button>
        </div>
      </form>
    </div>
  );
};
