import Link from "next/link";
import { useState } from "react";
import Logo, { LogoSize } from "@components/logo";

const AppResetPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto w-max"><Logo size={LogoSize.lg} /></div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Welcome to the party!</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-gray-500 text-center">You&apos;re all set. You may sign in using your email and password now.</span>
                </div>
              </div>

              <div className="mt-6">
                <div 
                  className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <Link href="/auth/login">Proceed to Sign in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default AppResetPage;
