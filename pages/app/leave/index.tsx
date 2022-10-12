import { Fragment, useState } from 'react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import ClientLayout from '@components/layouts/client-layout';
import { format, isToday, setMonth, startOfMonth, startOfToday, eachDayOfInterval, endOfMonth, setDay, isSameMonth } from 'date-fns';
import SlidePanel from '@components/slide-panels';
import ApplyLeave from '@components/slide-panels/apply-leave';
import Image from 'next/image';
import { classNames } from '@helpers/utils';

const meetings = [
  {
    id: 1,
    date: 'January 10th, 2022',
    time: '5:00 PM',
    datetime: '2022-01-10T17:00',
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Starbucks',
  },
  {
    id: 1,
    date: 'January 10th, 2022',
    time: '5:00 PM',
    datetime: '2022-01-10T17:00',
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Starbucks',
  },
  {
    id: 1,
    date: 'January 10th, 2022',
    time: '5:00 PM',
    datetime: '2022-01-10T17:00',
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Starbucks',
  },
  // More meetings...
]

const leaveBalances = [
  {
    id: 1,
    title: "Annual Leave",
    eligible: 12,
    taken: 3,
  },
  {
    id: 2,
    title: "Medical Leave",
    eligible: 14,
    taken: 5,
  },
  {
    id: 3,
    title: "Birthday Leave",
    eligible: 1,
    taken: 0,
  },
  {
    id: 4,
    title: "Marriage Leave",
    eligible: 5,
    taken: 0,
  },
  {
    id: 5,
    title: "Unpaid Leave",
    eligible: 15,
    taken: 0,
  },
  {
    id: 6,
    title: "Volunteer Leave",
    eligible: 3,
    taken: 0,
  },
  {
    id: 7,
    title: "Hospitalization Leave",
    eligible: 60,
    taken: 5,
  },

];

const AppLeavePage = () => {
  const today = startOfToday();
  const [currentDate, setCurrentDate] = useState(today);
  const [open, setOpen] = useState(false);

  const startOfMonthDate = setDay(startOfMonth(currentDate), 0);
  const endOfMonthDate = setDay(endOfMonth(currentDate), 6);
  console.log(startOfMonthDate.toString());

  const days = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });
  
  return (
    <>
      <ClientLayout>
        <div className="m-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Leave</h1>
              <p className="mt-2 text-sm text-gray-700">
                Some of your best ideas come when you&apos;re on vacation.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto"
                onClick={() => {setOpen(true);}}
              >
                Apply Leave
              </button>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="mt-4 text-center lg:col-span-4 lg:row-start-1 lg:mt-4 xl-col-span-5">
              <div className="flex items-center text-gray-900">
                <button
                  type="button"
                  className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    const prevMonth = currentDate.getMonth() - 1;
                    setCurrentDate(setMonth(currentDate, prevMonth));
                  }}
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex-auto font-semibold">{format(currentDate, 'MMM yyyy')}</div>
                <button
                  type="button"
                  className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    const nextMonth = currentDate.getMonth() + 1;
                    setCurrentDate(setMonth(currentDate, nextMonth));
                  }}
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                {days.map((day, dayIdx) => (
                  <button
                    key={day.toString()}
                    type="button"
                    className={classNames(
                      'py-1.5 hover:bg-gray-100 focus:z-10',
                      isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-50',
                      isToday(day) && 'font-semibold',
                      isToday(day) && 'text-white',
                      dayIdx === 0 && 'rounded-tl-lg',
                      dayIdx === 6 && 'rounded-tr-lg',
                      dayIdx === days.length - 7 && 'rounded-bl-lg',
                      dayIdx === days.length - 1 && 'rounded-br-lg'
                    )}
                  >
                    <time
                      dateTime={format(day, 'yyyy-MM-dd')}
                      className={classNames(
                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                        isToday(day) && 'bg-amber-900'
                      )}
                    >
                      {format(day, 'd')}
                      {/* {day?.date?.split('-').pop()?.replace(/^0/, '') || ''} */}
                    </time>
                  </button>
                ))}
              </div>
              <div
                className="mt-4 mb-4 w-full"
              >
                {leaveBalances.map((leaveBalance, leaveBalanceIdx) => (
                  <div 
                    key={leaveBalance.title}
                    className="mb-2 rounded-md bg-white shadow ring-1 ring-gray-100"
                  >
                    <div className="font-semibold bg-gray-100 px-2 py-2 rounded-md">{leaveBalance.title}</div>
                    <div className="grid grid-cols-3 px-2 py-2">
                      <div>
                        <div>Eligible</div>
                        <div>{leaveBalance.eligible}</div>
                      </div>
                      <div>
                        <div>Taken</div>
                        <div>{leaveBalance.taken}</div>
                      </div>
                      <div>
                        <div>Remaining</div>
                        <div>{leaveBalance.eligible - leaveBalance.taken}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ol className="divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
              {meetings.map((meeting) => (
                <li key={meeting.id} className="relative flex space-x-4 py-4 xl:static">
                  <div className="flex-auto">
                    <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{meeting.name}</h3>
                    <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                      <div className="flex items-start space-x-3">
                        <dt className="mt-0.5">
                          <span className="sr-only">Date</span>
                          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>
                          <time dateTime={meeting.datetime}>
                            {meeting.date} at {meeting.time}
                          </time>
                        </dd>
                      </div>
                      <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                        <dt className="mt-0.5">
                          <span className="sr-only">Location</span>
                          <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>{meeting.location}</dd>
                      </div>
                    </dl>
                  </div>
                  <Menu as="div" className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center">
                    {/* <div>
                      <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div> */}

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Edit
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Cancel
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
              ))}
              <div className="text-xl font-semibold text-gray-800 py-4">Others</div>
              {meetings.map((meeting) => (
                <li key={meeting.id} className="relative flex space-x-4 py-4 xl:static">
                  <Image
                    className="flex-none rounded-full"
                    src={meeting.imageUrl}
                    alt=""
                    width={56}
                    height={56}
                  />
                  <div className="flex-auto">
                    <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{meeting.name}</h3>
                    <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                      <div className="flex items-start space-x-3">
                        <dt className="mt-0.5">
                          <span className="sr-only">Date</span>
                          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>
                          <time dateTime={meeting.datetime}>
                            {meeting.date} at {meeting.time}
                          </time>
                        </dd>
                      </div>
                      <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                        <dt className="mt-0.5">
                          <span className="sr-only">Location</span>
                          <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>{meeting.location}</dd>
                      </div>
                    </dl>
                  </div>
                  <Menu as="div" className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center">
                    {/* <div>
                      <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div> */}

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Edit
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Cancel
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </ClientLayout>
      <SlidePanel open={open} setOpen={setOpen} title={"Apply Leave"} subtitle={"Love the life you live."}>
        <ApplyLeave />
      </SlidePanel>
    </>
  )
}

export default AppLeavePage;