import ClientLayout from "@/components/layouts/client-layout"

export default function Welcome() {
  return (
    <ClientLayout>
      <div className="px-4 mt-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Welcome</h1>
            <p className="mt-2 text-sm text-gray-700">
              Good company, good wine, good welcome, can make good people. Life is sweeter with caHRamel.
            </p>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

// export const getStaticProps = async (context: any) => {
//   const session = await getSession(context);
//   // Check if session exists or not, if not, redirect
//   if (session == null) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: true,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
