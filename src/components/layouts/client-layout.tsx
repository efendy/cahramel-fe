import {Fragment, memo, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {
  APP_NAVIGATION_CONFIGURE,
  APP_NAVIGATION_MAIN,
  APP_NAVIGATION_MANAGE,
} from '@helpers/navigation';
import {
  Bars3BottomLeftIcon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {useRouter} from 'next/router';
import Logo from '@components/logo';
import {classNames} from '@helpers/utils';
import Link from 'next/link';
import {UserMenu} from './user-menu';
import {Toaster} from 'react-hot-toast';
import {useUserContractStore, useUserStore} from '@zustand/user.store';

interface IClientLayout {
  children: JSX.Element;
}

const ClientLayout = memo((props: IClientLayout) => {
  const router = useRouter();
  const {user} = useUserStore();
  const {activeContract, setContract} = useUserContractStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentRoute = router.route;

  const userRole = activeContract?.access_role;
  if (!user?.user_contracts || user?.user_contracts?.length === 0) {
    //step 2
    return (
      <div className="max-w-5xl mx-auto px-4 lg:px-2 xl:px-0 py-2 relative">
        <div className="absolute right-0">
          <UserMenu />
        </div>
        <div className="text-center mt-10 font-semibold">
          Please setup your profile through cms
        </div>
      </div>
    );
  }

  if (!activeContract) {
    return (
      <div className="max-w-5xl mx-auto px-4 lg:px-2 xl:px-0 py-2 relative">
        <div className="absolute right-0">
          <UserMenu />
        </div>
        <div className="text-center mt-4 font-semibold">
          Please select one profile
        </div>
        <div className="justify-center mt-10 space-y-4">
          {user.user_contracts.map(x => (
            <div
              key={x.id}
              onClick={() => setContract(x)}
              className="border-amber-500 border-2 px-4 py-2 rounded-lg hover:bg-amber-500 cursor-pointer">
              <div>{x.company_profile?.data?.attributes?.title}</div>
              <div>{x.email_address}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  //step 3 for assign contract?

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full">
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Logo />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {APP_NAVIGATION_MAIN.map(item => (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                item.href === currentRoute
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                              )}>
                              <item.icon
                                className={classNames(
                                  item.href === currentRoute
                                    ? 'text-gray-500'
                                    : 'text-gray-400 group-hover:text-gray-500',
                                  'mr-4 flex-shrink-0 h-6 w-6',
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                      {userRole && userRole !== 'user' ? (
                        <>
                          <hr
                            className="my-5 border-t border-gray-200"
                            aria-hidden="true"
                          />
                          <p className="px-8 pb-4 font-medium text-gray-500">
                            Manage
                          </p>
                          <div className="space-y-1 px-2">
                            {APP_NAVIGATION_MANAGE.map(item => (
                              <Link key={item.name} href={item.href}>
                                <a
                                  className={classNames(
                                    item.href === currentRoute
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                  )}>
                                  <item.icon
                                    className={classNames(
                                      item.href === currentRoute
                                        ? 'text-gray-500'
                                        : 'text-gray-400 group-hover:text-gray-500',
                                      'mr-4 flex-shrink-0 h-6 w-6',
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </Link>
                            ))}
                          </div>

                          <hr
                            className="my-5 border-t border-gray-200"
                            aria-hidden="true"
                          />
                          <p className="px-8 pb-4 font-medium text-gray-500">
                            Configure
                          </p>
                          <div className="space-y-1 px-2">
                            {APP_NAVIGATION_CONFIGURE.map(item => (
                              <Link key={item.name} href={item.href}>
                                <a
                                  className={classNames(
                                    item.href === currentRoute
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md pl-11',
                                  )}>
                                  {item.name}
                                </a>
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <Logo />
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav aria-label="Sidebar">
                <div className="flex-1 space-y-1 px-2">
                  {APP_NAVIGATION_MAIN.map(item => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          item.href === currentRoute
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        )}>
                        <item.icon
                          className={classNames(
                            item.href === currentRoute
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6',
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                {userRole && userRole !== 'user' ? (
                  <>
                    <hr
                      className="my-5 border-t border-gray-200"
                      aria-hidden="true"
                    />
                    <p className="px-4 pb-4 text-sm font-medium text-gray-500">
                      Manage
                    </p>
                    <div className="flex-1 space-y-1 px-2">
                      {APP_NAVIGATION_MANAGE.map(item =>
                        item.href === '/manage/billing' &&
                        userRole &&
                        userRole !== 'owner' ? null : (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                item.href === currentRoute
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                              )}>
                              <item.icon
                                className={classNames(
                                  item.href === currentRoute
                                    ? 'text-gray-500'
                                    : 'text-gray-400 group-hover:text-gray-500',
                                  'mr-3 flex-shrink-0 h-6 w-6',
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </Link>
                        ),
                      )}
                    </div>
                    <hr
                      className="my-5 border-t border-gray-200"
                      aria-hidden="true"
                    />
                    <p className="px-4 pb-4 text-sm font-medium text-gray-500">
                      Configure
                    </p>
                    <div className="flex-1 space-y-1 px-2">
                      {APP_NAVIGATION_CONFIGURE.map(item => (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.href === currentRoute
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-sm font-medium rounded-md pl-10',
                            )}>
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : null}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 md:hidden"
              onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1"></div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <UserMenu />
              </div>
            </div>
          </div>

          <main className="flex-1">{props.children}</main>
        </div>
      </div>
      <Toaster />
    </>
  );
});

export default ClientLayout;
