import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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
            ...responseData.user,
            jwt: responseData.jwt
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
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: '/auth/login',
  }
}

export default NextAuth(authOptions);
