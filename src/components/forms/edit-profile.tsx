import Image from 'next/image';
import {
  useSetProfileMutation,
  useUpdateProfileMutation,
} from '@queries/use-profile';
import {useForm} from 'react-hook-form';
import {uploadFiles} from '@utils/api-client';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import {useUserStore} from '@zustand/user.store';

type FormValues = {
  first_name: string;
  last_name: string;
  gender: string;
  marital_status: string;
  birthday: string;
  email_address: string;
  phone_number: string;
  nationality: string;
  race: string;
  religion: string;
  image_blobs: Blob[];
};

export const ProfileForm = ({isCreate}: {isCreate?: boolean}) => {
  const {user} = useUserStore();
  console.log(user);
  const {register, handleSubmit, reset, watch} = useForm<FormValues>();
  const imageUpload = watch('image_blobs');

  const {mutate: create, isLoading: isCreating} = useSetProfileMutation();
  const {mutate: update, isLoading: isUpdating} = useUpdateProfileMutation();

  const onSubmit = handleSubmit(async data => {
    let uploadData = data as {
      [key: string]: any;
    };
    const imagesPath = await uploadFiles(data?.image_blobs);

    if (imagesPath?.length > 0) {
      uploadData = {
        ...uploadData,
        //image_profile: imagePath[0].id,
      };
    }
    if (isCreate) {
      create(uploadData);
      return;
    }
    update({...uploadData, id: user?.id ?? 0});
    toast.success('Update successfully');
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    const defaultValue = {
      first_name: user?.first_name,
      last_name: user?.last_name,
      gender: user?.gender,
      marital_status: user?.marital_status,
      birthday: user?.birthday,
      email_address: user?.email_address,
      phone_number: user?.phone_number,
      nationality: user?.nationality,
      race: user?.race,
      religion: user?.religion,
    };
    reset(defaultValue);
  }, [user, reset]);

  if (!isCreate) {
    //return null;
  }
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
            <Image
              className="inline-block rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
              alt=""
              width={48}
              height={48}
            />
            <div className="ml-4 flex">
              <div className="relative flex cursor-pointer items-center rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 focus-within:ring-offset-amber-gray-50 hover:bg-amber-gray-50">
                <label
                  htmlFor="user-photo"
                  className="pointer-events-none relative text-sm font-medium text-gray-700">
                  <span>Change</span>
                  <span className="sr-only"> user photo</span>
                </label>
                <input
                  id="user-photo"
                  name="user-photo"
                  type="file"
                  className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                />
              </div>
              <button
                type="button"
                className="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-amber-gray-50 text-gray-700">
                Remove
              </button>
            </div>
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
            name="first-name"
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
            name="last-name"
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
            name="gender"
            autoComplete="gender-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm">
            <option />
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
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
            name="marital_status"
            autoComplete="marital-status"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm">
            <option />
            <option>Single</option>
            <option>Married</option>
            <option>Widowed</option>
            <option>Separated</option>
            <option>Divorced</option>
            <option>Not Reported</option>
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
            name="birthday"
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
            name="email-address"
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
            name="phone-number"
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
          <select
            {...register('nationality')}
            id="nationality"
            name="nationality"
            autoComplete="nationality-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm">
            <option />
            <option>United States</option>
            <option>Singapore</option>
            <option>Malaysia</option>
            <option>Vietnam</option>
            <option>Myanmmar</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="race"
            className="block text-sm font-medium text-gray-700">
            Race
          </label>
          <input
            {...register('race')}
            type="text"
            name="race"
            id="race"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          />
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
            name="religion"
            autoComplete="-religion"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm">
            <option />
            <option>Buddhist</option>
            <option>Christianity</option>
            <option>Hinduism</option>
            <option>Islam</option>
            <option>Free thinker</option>
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
