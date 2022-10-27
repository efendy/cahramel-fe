import Logo, {LogoSize} from '@components/logo';
import NotLoggedIn from '@components/not-logged-in';
import {useGetContractInvite} from '@queries/use-user-contract';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';

export default () => {
  const {query} = useRouter();
  const code = query?.code as string | undefined;

  const {isError, isLoading} = useGetContractInvite(code);
  const {status} = useSession();

  if (status !== 'authenticated' && !isLoading) {
    return <NotLoggedIn />;
  }

  return (
    <div className="min-h-full justify-center pt-12 pb-4 sm:px-6 lg:px-8 m-10 sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-lg rounded-lg mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-max">
          <Logo size={LogoSize.lg} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {isError ? 'Something went wrong' : 'Checking your info....'}
        </h2>
      </div>

      <div className=" py-8 px-4 sm:rounded-lg sm:px-10">
        <div className="mt-3">
          <div className="relative">
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-500 text-center">
                All the sweets we promised you are on their way to your inbox
                now. Please check your inbox to confirm that we got your email
                right.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
            <Link href="/">Go Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
