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
          <button
            disabled={isCreating || isUpdating}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white shadow-sm items-center hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
            {isCreating || isUpdating ? (
              <svg
                aria-hidden="true"
                className="mr-2 w-4 h-4 text-gray-200 animate-spin fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : null}
            {isCreate ? 'Save' : 'Update'}
          </button>
        </div>
      ) : null}
    </form>
  );
};
