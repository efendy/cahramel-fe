import {useState} from 'react';
import {EditOnBoardForm} from '@components/configure/onboarding/edit-onboard-form';
import ClientLayout from '@components/layouts/client-layout';
import SlidePanel from '@components/slide-panels';
import {classNames} from '@helpers/utils';
import {useGetOnBoardings} from '@queries/use-onboard';
import {Pagination} from '@components/ui/pagination';
import {MetaHeader} from '@components/ui/meta-header';

const ConfigureOnboardingPage = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {data} = useGetOnBoardings({
    page,
  });
  const [onBoardId, setOnBoardId] = useState<number | undefined>();

  const onClose = () => setOpen(false);

  return (
    <>
      <MetaHeader title="Configure / OnBoarding" />
      <ClientLayout>
        <>
          <div className="px-4 mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Configure Onboarding
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Always remember that you are absolutely unique. Just like
                  everyone else. - Margaret Mead
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => {
                    setOnBoardId(undefined);
                    setOpen(true);
                  }}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto">
                  Configure New Onboarding
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
                            Title
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">
                            Description
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">
                            Job Title
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                            Is Activated?
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {data?.data &&
                          data.data?.map((onboard, personIdx) => (
                            <tr key={onboard.id}>
                              <td
                                className={classNames(
                                  personIdx !== data.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                                )}>
                                {onboard.title}
                              </td>
                              <td
                                className={classNames(
                                  personIdx !== data.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                                )}>
                                {onboard.description}
                              </td>
                              <td
                                className={classNames(
                                  personIdx !== data.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell',
                                )}>
                                {onboard.job_titles?.data
                                  ?.map(x => x.attributes.title)
                                  .join(', ')}
                              </td>
                              <td
                                className={classNames(
                                  personIdx !== data.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                                )}>
                                {onboard.is_activated ? 'Yes' : 'No'}
                              </td>
                              <td
                                className={classNames(
                                  personIdx !== data.data.length - 1
                                    ? 'border-b border-gray-200'
                                    : '',
                                  'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                                )}>
                                <div
                                  onClick={() => {
                                    setOnBoardId(onboard.id);
                                    setOpen(true);
                                  }}
                                  className="text-amber-600 hover:text-amber-900 cursor-pointer">
                                  Edit
                                  <span className="sr-only">
                                    , {onboard.title}
                                  </span>
                                </div>
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
          {data?.pagination ? (
            <Pagination
              pagination={data?.pagination}
              setPage={setPage}
              currentPage={page}
            />
          ) : null}
        </>
      </ClientLayout>
      <SlidePanel
        open={open}
        onClose={onClose}
        title={'Configure New Onboarding'}
        subtitle={'The healthiest response to life is joy.'}>
        <EditOnBoardForm onBoardId={onBoardId} onClose={onClose} />
      </SlidePanel>
    </>
  );
};

export default ConfigureOnboardingPage;
