import Link from 'next/link';
import {useState} from 'react';
import Image from 'next/image';
import Logo, {LogoSize} from '@components/logo';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import toast, {Toaster} from 'react-hot-toast';
import {linkUser} from '@queries/use-user-contract';

const AuthLoginPage = () => {
  const router = useRouter();
  const code = router.query?.code;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/app',
      email: event.target.email.value,
      password: event.target.password.value,
    });

    if (!result?.ok || !result?.url) {
      toast.error('Either email, password or both is not valid!');
      return;
    }
    if (code) {
      await linkUser(code as string);
    }
    router.push(result.url);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Logo size={LogoSize.lg} />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              {/* <p className="mt-2 text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link href="/auth/register">
                  <span className="font-medium text-amber-600 hover:text-amber-500" style={{ cursor: 'pointer' }}>Register</span>
                </Link>
                {' '}for free.
              </p> */}
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 relative block">
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          type="button">
                          {showPassword ? (
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          )}
                        </button>
                      </span>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        minLength={6}
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label> */}
                    </div>

                    <div className="text-sm">
                      <Link href="/auth/forgot">
                        <span
                          className="font-medium text-amber-600 hover:text-amber-500"
                          style={{cursor: 'pointer'}}>
                          Forgot your password?
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <div className="relative mt-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mt-6">
                    <div>
                      <div
                        onClick={() =>
                          signIn('google', {
                            callbackUrl: code
                              ? `/auth/invite?code=${code}`
                              : '/app',
                          })
                        }
                        className="cursor-pointer inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                        <span className="sr-only">Sign in with Google</span>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            stroke="null"
                            id="svg_1"
                            d="m11.90541,4.71256c1.75605,0 3.32855,0.60519 4.5687,1.78581l3.398,-3.398c-2.0636,-1.91975 -4.7572,-3.10037 -7.9667,-3.10037c-4.65303,0 -8.67606,2.6688 -10.6355,6.55789l3.95855,3.0706c0.93755,-2.82257 3.57162,-4.91594 6.67695,-4.91594z"
                            fill="#EA4335"
                          />
                          <path
                            stroke="null"
                            id="svg_2"
                            d="m23.30483,12.17824c0,-0.77881 -0.07441,-1.53282 -0.1885,-2.25707l-11.21092,0l0,4.47445l6.419,0c-0.28771,1.46833 -1.12109,2.7184 -2.37116,3.5617l3.83453,2.97635c2.23722,-2.07352 3.51706,-5.13917 3.51706,-8.75543z"
                            fill="#4285F4"
                          />
                          <path
                            stroke="null"
                            id="svg_3"
                            d="m5.2235,14.18231c-0.23811,-0.71928 -0.377,-1.48322 -0.377,-2.27691s0.13394,-1.55762 0.377,-2.27691l-3.95855,-3.0706c-0.80858,1.60723 -1.26495,3.4228 -1.26495,5.34751c0,1.92471 0.45637,3.74028 1.26991,5.34751l3.95359,-3.0706z"
                            fill="#FBBC05"
                          />
                          <path
                            stroke="null"
                            id="svg_4"
                            d="m11.90541,23.81081c3.21446,0 5.91798,-1.0566 7.88237,-2.8821l-3.83453,-2.97635c-1.06653,0.71928 -2.44061,1.14093 -4.04784,1.14093c-3.10533,0 -5.7394,-2.09337 -6.68191,-4.91594l-3.95855,3.0706c1.96439,3.89406 5.98743,6.56285 10.64046,6.56285z"
                            fill="#34A853"
                          />
                          <path
                            stroke="null"
                            id="svg_5"
                            d="m0,0l23.81081,0l0,23.81081l-23.81081,0l0,-23.81081z"
                            fill="none"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 h-full w-full object-cover">
            <Image src="/building1.png" alt="" layout="fill" />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AuthLoginPage;
