import ClientLayout from "@/components/layouts/client-layout";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Company() {
  return (
    <ClientLayout>
      <div className="px-4 mt-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Company Profile</h1>
            <p className="mt-2 text-sm text-gray-700">
              The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.
            </p>
          </div>
        </div>

        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 mt-6 mb-12">
          {/* Payment details */}
          <section aria-labelledby="payment-details-heading">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                      Payment details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your billing information. Please note that updating your location could affect your tax
                      rates.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-6">
                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="cc-family-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-1">
                      <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                        Expration date
                      </label>
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        placeholder="MM / YY"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-1">
                      <label
                        htmlFor="security-code"
                        className="flex items-center text-sm font-medium text-gray-700"
                      >
                        <span>Security code</span>
                        <QuestionMarkCircleIcon
                          className="ml-1 h-5 w-5 flex-shrink-0 text-gray-300"
                          aria-hidden="true"
                        />
                      </label>
                      <input
                        type="text"
                        name="security-code"
                        id="security-code"
                        autoComplete="cc-csc"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-amber-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </ClientLayout>
  )
}