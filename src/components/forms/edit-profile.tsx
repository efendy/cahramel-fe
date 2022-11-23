import {useGetProfile, useUpdateProfileMutation} from '@queries/use-profile';
import {Controller, useForm} from 'react-hook-form';
import {uploadFiles} from '@utils/api-client';
import toast from 'react-hot-toast';
import {useUserStore} from '@zustand/user.store';
import {Select} from '@components/ui/select';
import national from '@assets/nationalities.json';
import {
  GenderOptions,
  MaritalOptions,
  RaceOptions,
  ReligionOptions,
} from '@constants/profile-options';

type FormValues = {
  first_name: string;
  last_name: string;
  gender: string;
  marital_status: string;
  birthday: string;
  email_address: string;
  phone_number: string | undefined;
  nationality: {label: string; value: string} | undefined;
  race: string;
  religion: string;
  image_blobs: Blob[];
};

export const ProfileForm = () => {
  const {user} = useUserStore();
  const userId = user?.id;
  console.log(user);
  const {data: userProfile} = useGetProfile(userId, {
    onSuccess: newValue => {
      if (!newValue) {
        return;
      }
      const defaultValue = {
        first_name: newValue?.first_name,
        last_name: newValue?.last_name,
        gender: newValue?.gender,
        marital_status: newValue?.marital_status,
        birthday: newValue?.birthday,
        email_address: newValue?.email_address,
        phone_number: newValue?.phone_number,
        race: newValue?.race,
        religion: newValue?.religion,
        nationality: {
          label: newValue?.nationality,
          value: newValue?.nationality,
        },
      };
      reset(defaultValue);
    },
  });

  // Custom hook for managing forms
  const {register, handleSubmit, reset, watch, control} = useForm<FormValues>();
  const imageUpload = watch('image_blobs');
  const {mutate: update, isLoading: isUpdating} = useUpdateProfileMutation();

  const onSubmit = handleSubmit(async data => {
    let uploadData = {...data, nationality: data?.nationality?.value} as {
      [key: string]: any;
    };
    const imagesPath = await uploadFiles(data?.image_blobs);

    if (imagesPath?.length > 0) {
      uploadData = {
        ...uploadData,
        image_profile: imagesPath[0].id,
      };
    }
    update({...uploadData, id: user?.id ?? 0});
    toast.success('Updated Successfully');
  });
  return (
    <form
      onSubmit={onSubmit}
      className="divide-y-amber-gray-200 mt-6 mb-12 space-y-8 divide-y">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
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
              ) : userProfile?.image_profile?.data ? (
                <img
                  className="w-full h-full"
                  src={userProfile.image_profile.data?.attributes?.url}
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
            <input
              {...register('image_blobs')}
              type="file"
              className="ml-5 block text-sm text-gray-600 file:text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700">
            First name
          </label>
          <input
            {...register('first_name')}
            required
            type="text"
            id="first-name"
            autoComplete="given-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700">
            Last name
          </label>
          <input
            {...register('last_name')}
            type="text"
            id="last-name"
            autoComplete="family-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            {...register('gender')}
            id="gender"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm">
            {GenderOptions?.map(gender => (
              <option key={gender.value} value={gender.value}>
                {gender.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="marital_status"
            className="block text-sm font-medium text-gray-700">
            Marital Status
          </label>
          <select
            {...register('marital_status')}
            id="marital_status"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm">
            {MaritalOptions?.map(marital => (
              <option key={marital.value} value={marital.value}>
                {marital.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="birthday"
            className="block text-sm font-medium text-gray-700">
            Birthday
          </label>
          <input
            {...register('birthday')}
            type="date"
            id="birthday"
            autoComplete="birthday"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
        <div className="sm:col-span-6">
          <h2 className="text-xl font-medium">Personal Information</h2>
          <p className="mt-1 text-sm">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="email-address"
            className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            {...register('email_address')}
            type="email"
            id="email-address"
            autoComplete="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="phone-number"
            className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            {...register('phone_number')}
            type="tel"
            id="phone-number"
            autoComplete="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="nationality"
            className="block text-sm font-medium text-gray-700">
            Nationality
          </label>
          <Controller
            name="nationality"
            control={control}
            render={({field}) => (
              <Select
                {...field}
                id="nationality"
                defaultValue={user?.nationality}
                options={national.map(nationals => ({
                  label: nationals.nationality,
                  value: nationals.nationality,
                }))}
              />
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="race"
            className="block text-sm font-medium text-gray-700">
            Race
          </label>
          <select
            {...register('race')}
            id="race"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm">
            {RaceOptions?.map(race => (
              <option key={race.value} value={race.value}>
                {race.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="religion"
            className="block text-sm font-medium text-gray-700">
            Religion
          </label>
          <select
            {...register('religion')}
            id="religion"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm">
            {ReligionOptions?.map(race => (
              <option key={race.value} value={race.value}>
                {race.label}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm sm:col-span-6">
          This account was created on{' '}
          <time dateTime="2017-01-05T20:35:40">
            January 5, 2017, 8:35:40 PM
          </time>
          .
        </p>
      </div>

      <div className="flex justify-end pt-8">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium shadow-sm hover:bg-amber-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Save
        </button>
      </div>
    </form>
  );
};
