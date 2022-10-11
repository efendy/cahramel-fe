import ClientLayout from "@components/layouts/client-layout";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const UserSettingsPage = () => {
  // const [open, setOpen] = useState(false);

  return (
    <>
      <ClientLayout>
        <div className="px-4 mt-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Your Settings</h1>
              <p className="mt-2 text-sm text-gray-700">
                TBD.
              </p>
            </div>
          </div>

        </div>
      </ClientLayout>
      {/* <SlidePanel open={open} setOpen={setOpen} title={"Draft User"} subtitle={"Every moment is a fresh beginning."}>
      </SlidePanel> */}
    </>
  )
};

export default UserSettingsPage;
