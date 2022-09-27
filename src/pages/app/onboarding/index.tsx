import ClientLayout from "@/components/layouts/client-layout"

export default function Example() {
  return (
    <ClientLayout>
      <div className="px-4 mt-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Onboarding</h1>
            <p className="mt-2 text-sm text-gray-700">
              The action or process of integrating a new employee into an organization or familiarizing a new customer or client with one&apos;s products or services.
            </p>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
