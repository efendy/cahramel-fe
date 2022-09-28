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
        const res = await fetch("http://localhost:1337/api/auth/local", {
          method: 'POST',
          body: JSON.stringify({
            identifier: credentials?.email, 
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
        console.log(user.jwt);
        if (res.ok && user.jwt) {
          return user;
        }
        return null
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }: any) {
  //     console.log('signIn', user);
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }: any) {
  //     console.log('redirect', url, baseUrl);
  //     if (url.startsWith("/")) return `${baseUrl}${url}`
  //     else if (new URL(url).origin === baseUrl) return url
  //     return baseUrl;
  //   },
  //   async session({ session, user, token }: any) {
  //     console.log('session', session, user, token);
  //     return session;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }: any) {
  //     console.log('jwt', token, user, account, profile, isNewUser);
  //     return token;
  //   },
  // },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/register' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}

export default NextAuth(authOptions);
