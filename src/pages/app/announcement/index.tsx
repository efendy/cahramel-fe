import ClientLayout from "@/components/layouts/client-layout"
import Pagination from "@/components/pagination"

const messages = [
  {
    id: 1,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    time: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis.',
  },
  {
    id: 2,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    time: '2d ago',
    datetime: '2021-01-26T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 3,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    time: '3d ago',
    datetime: '2021-01-25T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis.',
  },
  {
    id: 4,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    time: '2d ago',
    datetime: '2021-01-26T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 5,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    time: '3d ago',
    datetime: '2021-01-25T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis.',
  },
  // More messages...
]

export default function Announcement() {
  return (
    <ClientLayout>
      <div className="px-4 mt-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Announcements</h1>
            <p className="mt-2 text-sm text-gray-700">
            Keep smiling, because life is a beautiful thing and there&apos;s so much to smile about.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <ul role="list" className="space-y-3">
            {messages.map((message) => (
              <li
                key={message.id}
                // className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600 hover:bg-gray-50"
                className="rounded-md bg-white px-4 py-4 shadow ring-1 ring-gray-100 hover:bg-gray-50"
              >
                <a href="#" className="flex space-x-4 focus:outline-none">
                  <img
                    className="inline-block h-20 w-20 rounded-md"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="w-full">
                    <div className="flex justify-between space-x-3">
                      <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">{message.sender}</p>
                          <p className="truncate text-sm text-gray-500">{message.subject}</p>
                      </div>
                      <time dateTime={message.datetime} className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                        {message.time}
                      </time>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-600 line-clamp-2">{message.preview}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Pagination />
      </div>
    </ClientLayout>
  )
}
