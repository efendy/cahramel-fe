import ClientLayout from '@components/layouts/client-layout';
import SlidePanel from '@components/slide-panels';
import {classNames} from '@helpers/utils';
import {useState} from 'react';

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
];

const ConfigureLeavePage = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <>
      <ClientLayout>
        <>
          <div className="px-4 mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Configure Leave
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Your time is limited, so don&apos;t waste it living someone
                  else&apos;s life. Don&apos;t be trapped by dogma – which is
                  living with the results of other people&apos;s thinking. -
                  Steve Jobs
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto">
                  Configure New Leave
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4">
                <div className="inline-block min-w-full py-2 align-middle">
                  <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                    <table
                      className="min-w-full border-separate"
                      style={{borderSpacing: 0}}>
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                            Name
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">
                            Title
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">
                            Email
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                            Role
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {people.map((person, personIdx) => (
                          <tr key={person.email}>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1
                                  ? 'border-b border-gray-200'
                                  : '',
                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                              )}>
                              {person.name}
                            </td>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1
                                  ? 'border-b border-gray-200'
                                  : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                              )}>
                              {person.title}
                            </td>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1
                                  ? 'border-b border-gray-200'
                                  : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell',
                              )}>
                              {person.email}
                            </td>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1
                                  ? 'border-b border-gray-200'
                                  : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                              )}>
                              {person.role}
                            </td>
                            <td
                              className={classNames(
                                personIdx !== people.length - 1
                                  ? 'border-b border-gray-200'
                                  : '',
                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                              )}>
                              <a
                                href="#"
                                className="text-amber-600 hover:text-amber-900">
                                Edit
                                <span className="sr-only">, {person.name}</span>
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
          {/* <Pagination /> */}
        </>
      </ClientLayout>
      <SlidePanel
        open={open}
        onClose={onClose}
        title={'Configure New Leave'}
        subtitle={'Life is a flower of which love is the honey.'}></SlidePanel>
    </>
  );
};

export default ConfigureLeavePage;
