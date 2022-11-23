import {useGetIndustryType} from '@queries/use-industry-type';
import {
  useGetCompany,
  useSetCompanyMutation,
  useUpdateCompanyMutation,
} from '@queries/use-company';
import {useForm} from 'react-hook-form';
import {uploadFiles} from '@utils/api-client';
import toast from 'react-hot-toast';
import {useUserContractStore} from '@zustand/user.store';
import {Button} from '@components/ui/button';

type FormValues = {
  title: string;
  uen: string;
  description: string;
  industry_type: number;
  contact_address: string;
  contact_postal_code: string;
  unique_id: string;
  image_blobs: Blob[];
};

export const CompanyForm = ({isCreate}: {isCreate?: boolean}) => {
  const {activeContract} = useUserContractStore();
  const userRole = activeContract?.access_role;
  const isOwner = userRole === 'owner';
  const companyId = activeContract?.company_profile?.data?.id;
  const {data: companyProfile} = useGetCompany(companyId, {
    onSuccess: newValue => {
      if (!newValue) {
        return;
      }
      const defaultValue = {
        contact_address: newValue?.contact_address,
        contact_postal_code: newValue?.contact_postal_code,
        description: newValue?.description,
        title: newValue?.title,
        uen: newValue?.uen,
        unique_id: newValue?.unique_id,
        industry_type: newValue?.industry_type?.data?.id,
      };
      reset(defaultValue);
    },
  });

  const {register, handleSubmit, reset, watch} = useForm<FormValues>();
  const imageUpload = watch('image_blobs');

  const {mutate: create, isLoading: isCreating} = useSetCompanyMutation();
  const {mutate: update, isLoading: isUpdating} = useUpdateCompanyMutation();
  const {data: industries} = useGetIndustryType();

  const onSubmit = handleSubmit(async data => {
    if (!isOwner) {
      return;
    }
    let uploadData = data as {
      [key: string]: any;
    };
    const imagesPath = await uploadFiles(data?.image_blobs);

    if (imagesPath?.length > 0) {
      uploadData = {
        ...uploadData,
        image_profile: imagesPath[0].id,
      };
    }
    if (isCreate) {
      create(uploadData);
      return;
    }
    update({...uploadData, id: activeContract?.company_profile?.data?.id ?? 0});
    toast.success('Updated successfully');
  });

  if (!isCreate && (!userRole || userRole === 'user')) {
    return null;
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 ${
        !isOwner ? 'text-gray-500' : ''
      }`}>
      <div className="sm:col-span-6">
        <label
          htmlFor="photo"
          className="block text-sm font-medium text-gray-700">
          Photo
        </label>
        <div className="mt-1 flex items-center">
          <div className="h-12 w-12 overflow-hidden rounded-full ">
            {imageUpload?.length > 0 ? (
              <img
                className="w-full h-full"
                src={URL.createObjectURL(imageUpload[0])}
              />
            ) : companyProfile?.image_profile?.data ? (
              <img
                className="w-full h-full"
                src={companyProfile.image_profile.data?.attributes?.url}
              />
            ) : (
              <span className="h-full w-full bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}
          </div>
          {isOwner ? (
            <input
              {...register('image_blobs')}
              type="file"
              className="ml-5 block text-sm text-gray-600 file:text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200 focus:border-amber-500 focus:ring-amber-500"
            />
          ) : null}
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="unique-id"
          className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
            workcation.com/
          </span>
          <input
            {...register('unique_id')}
            disabled={!isOwner}
            type="text"
            id="unique-id"
            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="uen"
          className="block text-sm font-medium text-gray-700">
          UEN
        </label>
        <div className="mt-1">
          <input
            {...register('uen')}
            required
            disabled={!isOwner}
            type="text"
            id="uen"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <div className="mt-1">
          <input
            {...register('title')}
            required
            disabled={!isOwner}
            type="text"
            id="title"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-6">
        <label
          htmlFor="industry"
          className="block text-sm font-medium text-gray-700">
          Industry Type
        </label>
        <select
          {...register('industry_type')}
          id="industry"
          disabled={!isOwner}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
          {industries?.map(industry => (
            <option key={industry.id} value={industry.id}>
              {industry.title}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <div className="mt-1">
          <input
            {...register('contact_address')}
            required
            disabled={!isOwner}
            type="text"
            id="address"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="postal-code"
          className="block text-sm font-medium text-gray-700">
          Postal code
        </label>
        <div className="mt-1">
          <input
            {...register('contact_postal_code')}
            required
            disabled={!isOwner}
            type="text"
            id="postal-code"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-6">
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700">
          About
        </label>
        <div className="mt-1">
          <textarea
            {...register('description')}
            required
            disabled={!isOwner}
            id="about"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
            defaultValue={''}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Write a few sentences about.
        </p>
      </div>
      {isOwner ? (
        <div className="flex justify-end sm:col-span-6">
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            loading={isCreating || isUpdating}>
            {isCreate ? 'Save' : 'Update'}
          </Button>
        </div>
      ) : null}
    </form>
  );
};
