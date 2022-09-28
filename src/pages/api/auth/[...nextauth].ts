import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Client',
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "efendy@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log('authorize', credentials);
        if (credentials == null) return null;
        try {
          const res = await fetch("http://localhost:1337/api/auth/local", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identifier: credentials?.email, 
              password: credentials?.password
            }),
          })
          const responseData = await res.json();
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
    session: async ({ session, token }: any) => {
      session.id = token.id;
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }: any) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
}

export default NextAuth(authOptions);
