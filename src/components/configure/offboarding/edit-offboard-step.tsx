import {Controller, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useUserContractStore} from '@zustand/user.store';
import {Button} from '@components/ui/button';
import {
  useDeleteOffBoardingStep,
  useEditOffBoardingStep,
  useGetOffBoardingStep,
} from '@queries/use-offboard-step';
import {OffBoardTypeOptions} from '@constants/board-types';
import dynamic from 'next/dynamic';
import {uploadFiles} from '@utils/api-client';
import {Select} from '@components/ui/select';
import {OffBoardStepTypes} from '@interfaces/offboarding';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false});

type FormValues = {
  order: number;
  image: Blob[];
  video_url: string;
  type: {label: string; value: OffBoardStepTypes} | undefined;
  document: Blob[];
  content: string;
};

interface IEditOffBoardStep {
  step?: number;
  onBardStepId?: number;
  offBoardId: number;
  prevOrder?: number; // offboard-step's last order value
}

export const EditOffBoardStep = ({
  onBardStepId,
  step = 0,
  offBoardId,
  prevOrder = 0,
}: IEditOffBoardStep) => {
  const {activeContract} = useUserContractStore();
  const userRole = activeContract?.access_role;
  const {register, handleSubmit, control, watch, setValue, reset} =
    useForm<FormValues>();
  const selectType = watch('type')?.value ?? 'content';

  const hasInput = selectType === 'image' || selectType === 'document';

  const {data: offBardStep} = useGetOffBoardingStep(onBardStepId, {
    onSuccess: newValue => {
      const activeTypeOption = OffBoardTypeOptions.find(
        x => x.value === newValue?.type,
      );
      setValue('content', newValue.content);
      setValue('type', activeTypeOption);
    },
  });

  const {mutate: editOffBoardStep, isLoading: isEditing} =
    useEditOffBoardingStep({
      onSuccess: () => {
        if (!offBardStep) {
          reset();
          toast.success('OffBoard step created');
          return;
        }
        toast.success('OffBoard step updated');
      },
    });
  const {mutate: deleteOffBoardStep, isLoading: isDeleting} =
    useDeleteOffBoardingStep({
      onSuccess: () => toast.success('Deleted OffBoard step'),
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
      order: offBardStep ? offBardStep.order : prevOrder + 1, // step start from 0
      type: typeValue,
      offboarding: offBoardId,
      image,
      document,
      id: offBardStep ? offBardStep.id : undefined,
    };
    editOffBoardStep(uploadData);
    // console.log('upload Data', uploadData);
  });

  const handleDelete = async () => {
    if (!offBardStep) {
      return;
    }
    if (confirm('Are you sure want to delete?')) {
      deleteOffBoardStep(offBardStep.id);
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
                  options={OffBoardTypeOptions}
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
                  {offBardStep?.[selectType]?.data?.id
                    ? 'Update file'
                    : 'Select a file'}
                </label>
                <div className="mt-1">
                  <input
                    {...register(selectType)}
                    required={!offBardStep?.[selectType]?.data?.id}
                    type={'file'}
                    id="notInput"
                    className="block w-full rounded-md border-gray-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm file:text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm"
                  />
                </div>
              </div>
              {!offBardStep?.[selectType]?.data ? null : (
                <div className="w-24 h-auto border-2 rounded-lg border-gray-300 p-[2px]">
                  <img src={offBardStep[selectType]?.data?.attributes.url} />
                </div>
              )}
            </>
          ) : null}
        </div>
        <div className="flex justify-end pr-8 space-x-3 mt-4">
          {offBardStep ? (
            <Button
              loading={isDeleting}
              onClick={handleDelete}
              className="bg-slate-50 border-primary border-2 text-black hover:bg-slate-200">
              Delete
            </Button>
          ) : null}
          <Button type="submit" loading={isEditing}>
            {offBardStep ? 'Update' : 'Create'} Step {step + 1}
          </Button>
        </div>
      </form>
    </div>
  );
};
