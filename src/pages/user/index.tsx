import {ProfileForm} from '@components/forms/edit-profile';
import ClientLayout from '@components/layouts/client-layout';

const UserProfilePage = () => {
  // const [open, setOpen] = useState(false);

  return (
    <>
      <ClientLayout>
        <div className="px-4 mt-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Your Profile
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                This information will be displayed for others.
              </p>
            </div>
          </div>

          <div className="mt-6 mb-12">
            <ProfileForm />
          </div>
        </div>
      </ClientLayout>
      {/* <SlidePanel open={open} setOpen={setOpen} title={"Draft User"} subtitle={"Every moment is a fresh beginning."}>
      </SlidePanel> */}
    </>
  );
};

export default UserProfilePage;
