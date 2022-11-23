import {DraftUser} from '@components/user/draft-user';
import ClientLayout from '@components/layouts/client-layout';
import SlidePanel from '@components/slide-panels';
import {classNames} from '@helpers/utils';
import Head from 'next/head';
import {useState} from 'react';
import {useGetContracts} from '@queries/use-user-contract';
import {UpdateContract} from '@components/user/update-contract';
import {Pagination} from '@components/ui/pagination';
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid';

const ManageUsersPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [modal, setModal] = useState<'update' | 'draft' | null>(null);
  const [contractId, setContractId] = useState(0);
  const [page, setPage] = useState(1);
  const {data: contracts} = useGetContracts({
    page,
    filters: !searchInput
      ? null
      : isNaN(Number(searchInput))
      ? `&filters[user_profile][first_name][$contains]=${searchInput}`
      : `&filters[employee_id][$contains]=${searchInput}`,
  });

  const onClose = () => {
    setContractId(0);
    setModal(null);
  };

  return (
    <>
      <Head>
        <title>Manage / Users</title>
      </Head>
      <ClientLayout>
        <>
          <div className="px-4 mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Users</h1>
              </div>
              <div className="relative mt-1 flex items-center">
                <input
                  onChange={e => setSearchInput(e.target.value)}
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 pr-20 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex py-2 pr-2">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400 hover:text-black"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-8 sm:flex-none">
                <button
                  onClick={() => {
                    setContractId(0);
                    setModal('draft');
                  }}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto">
                  Draft User
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
                        {contracts?.data &&
                          contracts.data?.map((person, personIdx) => (
                            <tr key={person.id}>
                              <td
                                className={classNames(
                                  personIdx !== contracts.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                                )}>
                                {`${
                                  person.user_profile?.data?.attributes
                                    ?.first_name ?? ''
                                } ${
                                  person.user_profile?.data?.attributes
                                    ?.last_name ?? ''
                                }`}
                              </td>
                              <td
                                className={classNames(
                                  personIdx !== contracts.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                                )}>
                                {person.job_title?.data?.attributes?.title}
                              </td>
                              <td
                                className={classNames(
                                  personIdx !== contracts.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell',
                                )}>
                                {person.email_address}
                              </td>
                              <td
                                className={classNames(
                                  personIdx !== contracts.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize',
                                )}>
                                {person.access_role}
                              </td>
                              <td
                                className={classNames(
                                  personIdx !== contracts.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                                )}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setContractId(person.id);
                                    setModal(
                                      person.is_draft ? 'draft' : 'update',
                                    );
                                  }}
                                  className="text-amber-600 hover:text-amber-900">
                                  Edit
                                  <span className="sr-only">
                                    , {person.email_address}
                                  </span>
                                </button>
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
          {contracts?.pagination ? (
            <Pagination
              currentPage={page}
              pagination={contracts.pagination}
              setPage={setPage}
            />
          ) : null}
        </>
      </ClientLayout>
      <SlidePanel
        open={!!modal}
        onClose={onClose}
        title={modal === 'draft' ? 'Draft User' : 'Contract Information'}
        subtitle={'Every moment is a fresh beginning.'}>
        {modal === 'update' ? (
          <UpdateContract contractId={contractId} onClose={onClose} />
        ) : modal === 'draft' ? (
          <DraftUser contractId={contractId} onClose={onClose} />
        ) : null}
      </SlidePanel>
    </>
  );
};

export default ManageUsersPage;
