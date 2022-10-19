import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { parseCookies, setCookie } from 'nookies'

type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any) {
          // console.log('authorize init', process.env.STRAPI_URL, credentials);
          if (credentials == null) return null;
          try {
            const res = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                identifier: credentials?.email,
                password: credentials?.password
              }),
            })
            const responseData = await res.json();
            // console.log('authorize responseData', responseData);
            if (responseData.error) {
              return null;
            }
            return {
              email: {
                ...responseData.user,
                jwt: responseData.jwt,
              },
              jwt: responseData.jwt,
            };
          } catch (error) {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }: any) => {
        const isSignIn = user ? true : false;
        if (isSignIn) {
          console.log('here')
          token.id = user.id;
          token.jwt = user.jwt;
        }
        // checking and add new cookies to allow account switch
        const userCookies = parseCookies({ req })['loggedUsers']
        const loggedUsers = userCookies ? JSON.parse(userCookies) as {
          email: {
            email: string
          }
        }[] : [];
        const filterUser = loggedUsers?.filter(x => x.email.email !== token.email.email);
        const newCookies = JSON.stringify([...filterUser, token])
        setCookie({ res }, 'loggedUsers', newCookies, { path: '/' })
        return Promise.resolve(token);
      },
    },
    pages: {
      signIn: '/auth/login',
    }
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}