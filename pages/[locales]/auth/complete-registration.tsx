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
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Thank you for registering!</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-gray-500 text-center">All the sweets we promised you are on their way to your inbox now. Please check your inbox to confirm that we got your email right.</span>
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
