import { Button } from '@components/ui/button';
import { useGetDepartments, useGetJobTitles } from '@queries/use-app-utils';
import { useDraftUserContract, useGetContracts } from '@queries/use-user-contract';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormValues = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    employee_id: string;
    job_title: number;
    department: number;
    reporting_to_main: number;
    reporting_to_secondary: number;
    date_start: Date;
    date_end: Date;
    needOnBoard: boolean;
    needOffBoard: boolean;
    cor_email_address: string; // for user-contract
    access_role: string;
}

export const DraftUser = () => {
    const clickedButton = useRef<string | null>(null);
    const { data: jobTitles } = useGetJobTitles()
    const { data: departments } = useGetDepartments()
    const { data: reportingTo } = useGetContracts(2) //TODO: change 2 to logged in user company's id
    const { mutate: draftUser, isLoading } = useDraftUserContract({
        onSuccess: () => {
            toast.success('Data added or updated successfully')
        }
    });

    console.log('reportingTo', JSON.stringify(reportingTo))

    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit = handleSubmit((data, e) => {
        const nativeEvent = e?.nativeEvent as unknown as {
            submitter: { id?: string }
        };
        const id = nativeEvent.submitter?.id

        const { first_name, last_name, email, phone, employee_id, date_start, date_end, access_role } = data;
        const uploadData = {
            profile: {
                first_name,
                last_name,
                email,
                phone
            },
            contract: {
                employee_id,
                job_title_id: data.job_title,
                reporting_to_main_id: data.reporting_to_main,
                reporting_to_secondary_id: data.reporting_to_secondary,
                department_id: data.department,
                date_start,
                date_end,
                onboarding_status: data.needOffBoard ? 'need' : "noneed",
                offboarding_status: data.needOffBoard ? 'need' : "noneed",
                email: data.cor_email_address,
                access_role,
                company_id: 2
            },
            method: id === 'confirm' ? 'confirm' : 'save'
        }
        clickedButton.current = id ?? null

        draftUser(uploadData)

        console.log('isDraft', JSON.stringify(uploadData))
    })

    return (
        <form id='draft-user-form' onSubmit={onSubmit} className="pb-8 space-y-6">
            <div className="px-4 py-5 sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="col-span-full">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                        <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    First name
                                </label>
                                <input
                                    {...register('first_name')}
                                    type="text"
                                    required
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    Last name
                                </label>
                                <input
                                    {...register('last_name')}
                                    type="text"
                                    required
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    {...register('email')}
                                    type="text"
                                    required
                                    id="email-address"
                                    autoComplete="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="phone-no" className="block text-sm font-medium text-gray-700">
                                    Phone number (optional)
                                </label>
                                <input
                                    {...register('phone')}
                                    type="text"
                                    id="phone-no"
                                    autoComplete="phone"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 h-[2px] w-full" />
            <div className="px-4 py-5 sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="col-span-full">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Contract Information</h3>
                        <p className="mt-1 text-sm text-gray-500">Decide which communications you'd like to receive and how.</p>
                    </div>
                    <div className="mt-5 md:col-span-3 md:mt-0 ">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="employee-id" className="block text-sm font-medium text-gray-700">
                                    Employee ID
                                </label>
                                <input
                                    {...register('employee_id')}
                                    type="text"
                                    required
                                    id="employee-id"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">
                                    Job title
                                </label>
                                <select
                                    {...register('job_title')}
                                    id="job-title"
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                >
                                    {jobTitles?.map(jobTitle => (
                                        <option key={jobTitle.id} value={jobTitle.id}>{jobTitle.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                    Department
                                </label>
                                <select
                                    {...register('department')}
                                    id="department"
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                >
                                    {departments?.map(department => (
                                        <option key={department.id} value={department.id}>{department.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="reporting-main" className="block text-sm font-medium text-gray-700">
                                    Reporting to main
                                </label>
                                <select
                                    {...register('reporting_to_main')}
                                    id="reporting-main"
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                    defaultValue={reportingTo && reportingTo?.length > 0 ? reportingTo[0].id : undefined}
                                >
                                    {reportingTo?.map(r => (
                                        <option key={r.id} value={r.id}>{r?.email_address}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="reporting-secondary" className="block text-sm font-medium text-gray-700">
                                    Reporting to secondary (optional)
                                </label>
                                <select
                                    {...register('reporting_to_secondary')}
                                    id="reporting-secondary"
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                    defaultValue={reportingTo && reportingTo?.length > 0 ? reportingTo[0].id : undefined}
                                >
                                    {reportingTo?.map(r => (
                                        <option key={r.id} value={r.id}>{r?.email_address}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                    Commencement date
                                </label>
                                <input
                                    {...register('date_start')}
                                    type="date"
                                    id="start-date"
                                    autoComplete="start-date"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
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
                                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                                    Termination date
                                </label>
                                <input
                                    {...register('date_end')}
                                    type="date"
                                    id="end-date"
                                    autoComplete="end-date"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
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
                                <label htmlFor="corp-email" className="block text-sm font-medium text-gray-700">
                                    Corporate email address
                                </label>
                                <input
                                    {...register('cor_email_address')}
                                    type="text"
                                    id="corp-email"
                                    autoComplete="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="access-role" className="block text-sm font-medium text-gray-700">
                                    Access Role
                                </label>
                                <select
                                    {...register('access_role')}
                                    id="access-role"
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                >
                                    <option value={'user'}>User</option>
                                    <option value={'admin'}>Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pr-8 space-x-3">
                <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
                <Button
                    id='draft'
                    type='submit'
                    className='border border-amber-600 bg-slate-50 text-gray-800'
                    loading={clickedButton.current === 'draft' && isLoading}
                >
                    Save as draft
                </Button>
                <Button
                    id='confirm'
                    type='submit'
                    loading={clickedButton.current === 'confirm' && isLoading}
                >
                    Confirm and send out invitation
                </Button>
            </div>
        </form>
    );
};
