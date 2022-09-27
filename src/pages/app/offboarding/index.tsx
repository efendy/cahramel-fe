import ClientLayout from "@/components/layouts/client-layout"

export default function Example() {
  return (
    <ClientLayout>
    <div className="px-4 mt-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Offboarding</h1>
            <p className="mt-2 text-sm text-gray-700">
              The reverse of onboarding, and it involves separating an employee from a firm. This can include a process for sharing knowledge with other employees.
            </p>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
