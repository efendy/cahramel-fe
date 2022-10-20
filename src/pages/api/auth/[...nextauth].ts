import { client } from '@utils/api-client';
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
            const responseData = await client('auth/local', 'POST', {
              data: {
                identifier: credentials?.email,
                password: credentials?.password
              }
            })
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
    ],
    callbacks: {
      jwt: async (params) => {
        // console.log('---start---')
        // console.log('paramss', params)
        // console.log('---end---')
        const user = params.user;
        const token = params.token
        const isSignIn = user ? true : false;
        if (isSignIn) {
          token.id = user?.id;
          token.accessToken = user?.jwt;
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
      async session({ session, token }) {
        session.id = token.id
        session.accessToken = token.accessToken
        return session
      }
    },
    pages: {
      signIn: '/auth/login',
    }
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}