import { useGetIndustryType } from "@queries/use-industry-type"
import { useSetCompanyMutation, useUpdateCompanyMutation } from "@queries/use-company"
import { useForm } from "react-hook-form";
import { useGetProfile } from "@queries/use-user";

type FormValues = {
    title: string;
    uen: string;
    description: string;
    industry_type: number;
    contact_address: string;
    contact_postal_code: string;
    unique_id: string
    // image_profile: number //TODO:
}

export const CompanyForm = ({ isCreate }: { isCreate?: boolean }) => {
    const { data, isLoading } = useGetProfile();
    const userRole = data?.user_contract?.access_role;
    const isOwner = userRole === 'owner';
    const companyProfile = data?.user_contract?.company_profile
    console.log('companyProfile', companyProfile)

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            contact_address: companyProfile?.contact_address,
            contact_postal_code: companyProfile?.contact_postal_code,
            description: companyProfile?.description,
            title: companyProfile?.title,
            uen: companyProfile?.uen,
            unique_id: companyProfile?.unique_id,
            industry_type: companyProfile?.industry_type?.data?.id
        },
    });

    const { mutate: create } = useSetCompanyMutation();
    const { mutate: update } = useUpdateCompanyMutation();
    const { data: industries } = useGetIndustryType()


    const onSubmit = handleSubmit((data) => {
        if (!isOwner) {
            return;
        }
        if (isCreate) {
            create(data)
            return;
        }
        update({ ...data, id: companyProfile?.id ?? 0 })
        return;
    });

    if (!isCreate && (!userRole || userRole === 'user')) {
        return null;
    }

    if (!isCreate && isLoading) {
        return <div>Loading ....</div>
    }

    return (
        <form onSubmit={onSubmit} className={`mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 ${!isOwner ? 'text-gray-500' : ''}`}>
            <div className="sm:col-span-6">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                    Photo
                </label>
                <div className="mt-1 flex items-center">
                    <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <input type="file"
                        className="ml-5 block text-sm text-gray-600 file:text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200 focus:border-amber-500 focus:ring-amber-500" />
                </div>
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="unique-id" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="uen" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry Type
                </label>
                <select
                    {...register('industry_type')}
                    id="industry"
                    disabled={!isOwner}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                >
                    {industries?.map(industry => (
                        <option key={industry.id} value={industry.id}>{industry.title}</option>
                    ))}
                </select>
            </div>
            <div className="sm:col-span-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
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
                <p className="mt-2 text-sm text-gray-500">Write a few sentences about.</p>
            </div>
            {isOwner ? (
                <div className="flex justify-end sm:col-span-6">
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                        {isCreate ? 'Save' : 'Update'}
                    </button>
                </div>
            ) : null}
        </form>
    )
}
