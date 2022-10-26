import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo, { LogoSize } from "@components/logo";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { linkPublicUser } from "@queries/use-user-contract";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const AuthRegisterPage = () => {
  const router = useRouter();
  const query = router.query
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: result } = await axios.post('/api/user/register', data);
      if (!result || !result?.user) {
        throw new Error('Something went wrong')
      }
      if (query?.code) {
        const user = result.user;
        const postData = {
          code: query.code,
          email: user.email,
          user_id: user.id

        };
        await linkPublicUser(postData)
      }
      router.push('/auth/complete-registration'); // TODO: send to Thank you for registering, please check your email to confirm.
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message)
    }
  });

  useEffect(() => {
    if (!query?.first_name || !query?.last_name || !query?.email || !query?.code) {
      return;
    }
    if (query?.code) {
      toast('Please register to accept invitation')
    }

    reset(query)
  }, [query, reset])


  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Logo size={LogoSize.lg} />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Register a new account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Already registered?{' '}
                <Link href="/auth/login">
                  <span className="font-medium text-amber-600 hover:text-amber-500" style={{ cursor: 'pointer' }}>Sign in</span>
                </Link>
                {' '}to your account.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        id="first_name"
                        {...register('first_name')}
                        type="text"
                        required
                        autoFocus
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        id="last_name"
                        {...register('last_name')}
                        type="text"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        {...register('email')}
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 relative block">
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button onClick={() => setShowPassword(!showPassword)} type="button">
                          {showPassword ? (
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          ) : (
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                          )}
                        </button>
                      </span>
                      <input
                        id="password"
                        {...register('password')}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        minLength={6}
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="tnc"
                        name="tnc"
                        type="checkbox"
                        required
                        title="You have to accept our term and conditions."
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="tnc" className="ml-2 block text-sm text-gray-900">
                        Accept our term and conditions.
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 h-full w-full object-cover">
            <Image
              src="/building1.png"
              alt=""
              layout="fill"
            />
          </div>
        </div>
        <Toaster />
      </div>
    </>
  )
};

export default AuthRegisterPage;
