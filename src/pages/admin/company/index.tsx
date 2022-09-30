import ClientLayout from "@/components/layouts/client-layout";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Company() {
  // const [open, setOpen] = useState(false);

  return (
    <>
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

        </div>
      </ClientLayout>
      {/* <SlidePanel open={open} setOpen={setOpen} title={"Draft User"} subtitle={"Every moment is a fresh beginning."}>
      </SlidePanel> */}
    </>
  )
}
