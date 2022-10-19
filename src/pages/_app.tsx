import '../assets/styles/globals.css'
import { useState } from 'react';
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}