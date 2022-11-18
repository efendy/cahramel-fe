import {Controller, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useUserContractStore} from '@zustand/user.store';
import {Button} from '@components/ui/button';
import {
  useDeleteOnBoardingStep,
  useEditOnBoardingStep,
  useGetOnBoardingStep,
} from '@queries/use-onboard-step';
import {OnBoardStepTypes} from '@interfaces/onboarding';
import {TypeOptions} from '@constants/onboard';
import dynamic from 'next/dynamic';
import {uploadFiles} from '@utils/api-client';
import {Select} from '@components/ui/select';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false});

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
  onBardStepId?: number;
  onBoardId: number;
  prevOrder?: number; // onboard-step's last order value
}

export const EditOnBoardStep = ({
  onBardStepId,
  step = 0,
  onBoardId,
  prevOrder = 0,
}: IEditOnBoardStep) => {
  const {activeContract} = useUserContractStore();
  const userRole = activeContract?.access_role;
  const {register, handleSubmit, control, watch, setValue, reset} =
    useForm<FormValues>();
  const selectType = watch('type')?.value ?? 'content';

  const hasInput =
    selectType === 'image' ||
    selectType === 'video_url' ||
    selectType === 'document';

  const {data: onBardStep} = useGetOnBoardingStep(onBardStepId, {
    onSuccess: newValue => {
      const activeTypeOption = TypeOptions.find(
        x => x.value === newValue?.type,
      );
      setValue('content', newValue.content);
      setValue('type', activeTypeOption);
      if (newValue.type === 'video_url' && newValue.video_url) {
        setValue('video_url', newValue.video_url);
      }
    },
  });

  const {mutate: editOnBoardStep, isLoading: isEditing} = useEditOnBoardingStep(
    {
      onSuccess: () => {
        if (!onBardStep) {
          reset();
          toast.success('OnBoard step created');
          return;
        }
        toast.success('OnBoard step updated');
      },
    },
  );
  const {mutate: deleteOnBoardStep, isLoading: isDeleting} =
    useDeleteOnBoardingStep({
      onSuccess: () => toast.success('Deleted OnBoard step'),
    });

  const onSubmit = handleSubmit(async data => {
    const typeValue = data.type?.value;
    let image;
    let document;
    if (typeValue === 'document' || typeValue === 'image') {
      const imagesPath = await uploadFiles(data?.image);
      if (imagesPath.length > 0) {
        image = imagesPath[0].id;
      }
      const documentPath = await uploadFiles(data?.document);
      if (documentPath.length > 0) {
        document = documentPath[0].id;
      }
    }
    const uploadData = {
      ...data,
      order: prevOrder + 1, // step start from 0
      type: typeValue,
      onboarding: onBoardId,
      image,
      document,
      id: onBardStep ? onBardStep.id : undefined,
    };
    editOnBoardStep(uploadData);
    // console.log('upload Data', uploadData);
  });

  const handleDelete = async () => {
    if (!onBardStep) {
      return;
    }
    if (confirm('Are you sure want to delete?')) {
      deleteOnBoardStep(onBardStep.id);
    }
  };

  if (!userRole || userRole === 'user') {
    return null;
  }

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
                render={({field}) => <SimpleMDE {...field} />}
              />
            </div>
          </div>
          {hasInput ? (
            <>
              <div className="col-span-6">
                <label
                  htmlFor="notInput"
                  className="block text-sm font-medium text-gray-700">
                  {selectType === 'video_url'
                    ? 'Enter video url'
                    : onBardStep?.[selectType]?.data?.id
                    ? 'Update file'
                    : 'Select a file'}
                </label>
                <div className="mt-1">
                  <input
                    {...register(selectType)}
                    required={
                      selectType === 'video_url'
                        ? true
                        : onBardStep?.[selectType]?.data?.id
                        ? false
                        : true
                    }
                    type={selectType === 'video_url' ? 'text' : 'file'}
                    id="notInput"
                    className="block w-full rounded-md border-gray-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm file:text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm"
                  />
                </div>
              </div>
              {selectType === 'video_url' ||
              !onBardStep?.[selectType]?.data ? null : (
                <div className="w-24 h-auto border-2 rounded-lg border-gray-300 p-[2px]">
                  <img src={onBardStep[selectType]?.data?.attributes.url} />
                </div>
              )}
            </>
          ) : null}
        </div>
        <div className="flex justify-end pr-8 space-x-3 mt-4">
          {onBardStep ? (
            <Button
              loading={isDeleting}
              onClick={handleDelete}
              className="bg-slate-50 border-primary border-2 text-black hover:bg-slate-200">
              Delete
            </Button>
          ) : null}
          <Button type="submit" loading={isEditing}>
            {onBardStep ? 'Update' : 'Create'} Step {step + 1}
          </Button>
        </div>
      </form>
    </div>
  );
};
