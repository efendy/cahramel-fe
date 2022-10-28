import '../assets/styles/globals.css';
import {useState} from 'react';
import type {AppProps} from 'next/app';
import {SessionProvider, useSession} from 'next-auth/react';
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useGetProfile} from '@queries/use-user';
import {useUserContractStore, useUserStore} from '@zustand/user.store';

export default function App({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

function Auth({children}: {children: JSX.Element}) {
  const {setUser} = useUserStore();
  const {activeContract, setContract} = useUserContractStore();
  const {status, data: session} = useSession();
  useGetProfile({
    enabled: status === 'authenticated',
    onSuccess: data => {
      setUser(data);
      if (activeContract) {
        return;
      }
      const sessionMail = session?.user?.email;
      const contract = data?.user_contracts?.find(
        x => x.email_address === sessionMail,
      );
      if (!contract) {
        return;
      }
      setContract(contract);
    },
  });

  return children;
}
