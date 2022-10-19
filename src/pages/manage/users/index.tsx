import ClientLayout from "@components/layouts/client-layout"
import Pagination from "@components/pagination"
import SlidePanel from "@components/slide-panels";
import { classNames } from "@helpers/utils";
import { useState } from "react";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

const ManageUsersPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ClientLayout>
        <>
          <div className="px-4 mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                <p className="mt-2 text-sm text-gray-700">
                  “Connect the dots between individual roles and the goals of the organization. When people see that connection, they get a lot of energy out of work. They feel the importance, dignity, and meaning in their job.” – Ken Blanchard.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto"
                >
                  Draft User
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4">
                <div className="inline-block min-w-full py-2 align-middle">
                  <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                    <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {people.map((person, personIdx) => (
                          <tr key={person.email}>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                              )}
                            >
                              {person.name}
                            </td>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                              )}
                            >
                              {person.title}
                            </td>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell'
                              )}
                            >
                              {person.email}
                            </td>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                              )}
                            >
                              {person.role}
                            </td>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                              )}
                            >
                              <a href="#" className="text-amber-600 hover:text-amber-900">
                                Edit<span className="sr-only">, {person.name}</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination />
        </>
      </ClientLayout>
      <SlidePanel open={open} setOpen={setOpen} title={"Draft User"} subtitle={"Every moment is a fresh beginning."}>
        <form className="pb-8 space-y-6" action="#" method="POST">
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
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="phone-no" className="block text-sm font-medium text-gray-700">
                      Phone number (optional)
                    </label>
                    <input
                      type="text"
                      name="phone-no"
                      id="phone-no"
                      autoComplete="phone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      type="text"
                      name="employee-id"
                      id="employee-id"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">
                      Job title
                    </label>
                    <select
                      id="job-title"
                      name="job-title"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>FullStack Developer</option>
                      <option>Software Developer</option>
                      <option>Mobile Developer</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                      Department (optional)
                    </label>
                    <input
                      type="text"
                      name="department"
                      id="department"
                      autoComplete="department"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="reporting-main" className="block text-sm font-medium text-gray-700">
                      Reporting to main
                    </label>
                    <select
                      id="reporting-main"
                      name="reporting-main"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>John</option>
                      <option>Steve</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="reporting-secondary" className="block text-sm font-medium text-gray-700">
                      Reporting to secondary (optional)
                    </label>
                    <select
                      id="reporting-secondary"
                      name="reporting-secondary"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Steve</option>
                      <option>John</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                      Commencement date
                    </label>
                    <input
                      type="date"
                      name="start-date"
                      id="start-date"
                      autoComplete="start-date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-full relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="onboard"
                        aria-describedby="onboard"
                        name="onboard"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                      type="date"
                      name="end-date"
                      id="end-date"
                      autoComplete="end-date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-full relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="offboard"
                        aria-describedby="offboard"
                        name="offboard"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                      type="text"
                      name="corp-email"
                      id="corp-email"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="access-role" className="block text-sm font-medium text-gray-700">
                      Access Role
                    </label>
                    <select
                      id="access-role"
                      name="access-role"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>User</option>
                      <option>Admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pr-8">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-indigo-600 py-2 px-4 text-sm font-medium text-indigo-700 shadow-sm hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save as draft
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Confirm and send out invitation
            </button>
          </div>
        </form>
      </SlidePanel>
    </>
  )
};

export default ManageUsersPage;
