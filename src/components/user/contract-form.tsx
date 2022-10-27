import {UserContractType} from '@interfaces/user-contract';
import {useGetDepartments, useGetJobTitles} from '@queries/use-app-utils';
import {useGetContracts} from '@queries/use-user-contract';
import React from 'react';
import {Control, Controller, UseFormRegister} from 'react-hook-form';
import Select from 'react-select';

interface IContractForm {
  contract?: UserContractType['attributes'] | null;
  control: Control<any, any>;
  register: UseFormRegister<any>;
}

export const ContractForm = ({contract, control, register}: IContractForm) => {
  const {data: jobTitles} = useGetJobTitles();
  const {data: departments} = useGetDepartments();
  const {data: reportingTo} = useGetContracts(2); //TODO: change 2 to logged in user company's id

  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="employee-id"
          className="block text-sm font-medium text-gray-700">
          Employee ID
        </label>
        <input
          {...register('employee_id')}
          type="text"
          required
          id="employee-id"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          defaultValue={contract?.employee_id}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="job-title"
          className="block text-sm font-medium text-gray-700">
          Job title
        </label>
        <Controller
          name="job_title"
          control={control}
          render={({field}) => (
            <Select
              {...field}
              defaultValue={
                contract?.job_title?.data
                  ? {
                      label: contract?.job_title?.data?.attributes.title,
                      value: contract?.job_title?.data?.id,
                    }
                  : undefined
              }
              options={jobTitles?.map(x => ({value: x.id, label: x.title}))}
            />
          )}
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-700">
          Department (optional)
        </label>
        <Controller
          name="department"
          control={control}
          render={({field}) => (
            <Select
              {...field}
              defaultValue={
                contract?.department?.data
                  ? {
                      label: contract?.department?.data?.attributes.title,
                      value: contract?.department?.data?.id,
                    }
                  : undefined
              }
              options={departments?.map(x => ({
                value: x.id,
                label: x.title,
              }))}
            />
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="reporting-main"
          className="block text-sm font-medium text-gray-700">
          Reporting to main (optional)
        </label>
        <Controller
          name="reporting_to_main"
          control={control}
          render={({field}) => (
            <Select
              {...field}
              defaultValue={
                contract?.reporting_to_main?.data
                  ? {
                      label:
                        contract?.reporting_to_main?.data?.attributes
                          .email_address,
                      value: contract?.reporting_to_main?.data?.id,
                    }
                  : undefined
              }
              options={reportingTo?.map(x => ({
                value: x.id,
                label: x.email_address,
              }))}
            />
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="reporting-secondary"
          className="block text-sm font-medium text-gray-700">
          Reporting to secondary (optional)
        </label>
        <Controller
          name="reporting_to_secondary"
          control={control}
          render={({field}) => (
            <Select
              {...field}
              defaultValue={
                contract?.reporting_to_secondary?.data
                  ? {
                      label:
                        contract?.reporting_to_secondary?.data?.attributes
                          .email_address,
                      value: contract?.reporting_to_secondary?.data?.id,
                    }
                  : undefined
              }
              options={reportingTo?.map(x => ({
                value: x.id,
                label: x.email_address,
              }))}
            />
          )}
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="start-date"
          className="block text-sm font-medium text-gray-700">
          Commencement date
        </label>
        <input
          {...register('date_start')}
          type="date"
          id="start-date"
          autoComplete="start-date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          defaultValue={contract?.date_start}
        />
      </div>
      <div className="col-span-full relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            {...register('needOnBoard')}
            id="onboard"
            aria-describedby="onboard"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            defaultChecked={contract?.onboarding_status === 'need'}
            // checked={data?.onboarding_status === 'need'}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="onboard" className="font-medium text-gray-700">
            Need Onboarding?
          </label>
          <p id="onboard" className="text-gray-500">
            Get notified when checked.
          </p>
        </div>
      </div>

      <div className="col-span-6">
        <label
          htmlFor="end-date"
          className="block text-sm font-medium text-gray-700">
          Termination date
        </label>
        <input
          {...register('date_end')}
          type="date"
          id="end-date"
          autoComplete="end-date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          defaultValue={contract?.date_end}
        />
      </div>
      <div className="col-span-full relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            {...register('needOffBoard')}
            id="offboard"
            aria-describedby="offboard"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            defaultChecked={contract?.offboarding_status === 'need'}
            // checked={data?.offboarding_status === 'need'}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="offboard" className="font-medium text-gray-700">
            Need Offboarding?
          </label>
          <p id="offboard" className="text-gray-500">
            Get notified when checked.
          </p>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-4">
        <label
          htmlFor="corp-email"
          className="block text-sm font-medium text-gray-700">
          Corporate email address
        </label>
        <input
          {...register('email')}
          type="text"
          id="corp-email"
          autoComplete="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
          defaultValue={contract?.email_address}
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="access-role"
          className="block text-sm font-medium text-gray-700">
          Access Role
        </label>

        <select
          {...register('access_role')}
          id="access-role"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
          defaultValue={contract?.access_role}>
          <option value={'user'}>User</option>
          <option value={'admin'}>Admin</option>
        </select>
      </div>
    </div>
  );
};
