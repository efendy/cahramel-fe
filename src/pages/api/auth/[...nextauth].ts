import {client} from '@utils/api-client';
import {NextApiRequest, NextApiResponse} from 'next';
import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
) => NextAuthOptions;

const nextAuthOptions: NextAuthOptionsCallback = () => {
  return {
    providers: [
      CredentialsProvider({
        id: 'credentials',
        name: 'credentials',
        credentials: {
          email: {
            label: 'Email',
            type: 'email',
          },
          password: {label: 'Password', type: 'password'},
        },
        async authorize(credentials: any) {
          // console.log('authorize init', process.env.STRAPI_URL, credentials);
          if (credentials == null) return null;
          try {
            const responseData = await client('auth/local', 'POST', {
              data: {
                identifier: credentials?.email,
                password: credentials?.password,
              },
            });
            if (responseData.error) {
              return null;
            }
            return {
              jwt: responseData.jwt,
              id: responseData.user?.id,
              user: responseData.user,
            };
          } catch (error) {
            return null;
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    callbacks: {
      jwt: async ({token, user, account}) => {
        const isGoogle = account?.provider === 'google';
        if (user && !isGoogle) {
          token.id = user?.id;
          token.accessToken = user?.jwt;
        }
        if (user && isGoogle) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`,
          );
          const data = await response.json();
          token.id = data.user.id;
          token.accessToken = data.jwt;
        }
        // checking and add new cookies to allow account switch
        // const userCookies = parseCookies({ req })['loggedUsers']
        // const loggedUsers = userCookies ? JSON.parse(userCookies) as {
        //   email: {
        //     email: string
        //   }
        // }[] : [];
        // console.log('new cookies >', token)
        // const filterUser = loggedUsers?.filter(x => x?.email?.email !== token?.email);
        // const newCookies = JSON.stringify([...filterUser, token])
        // setCookie({ res }, 'loggedUsers', newCookies, { path: '/' })
        return Promise.resolve(token);
      },
      async session({session, token}) {
        session.id = token.id;
        session.accessToken = token.accessToken;
        return session;
      },
      async signIn() {
        return true;
      },
    },
    pages: {
      signIn: '/auth/login',
    },
  };
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
