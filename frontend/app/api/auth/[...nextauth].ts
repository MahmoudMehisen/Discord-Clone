import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ isAdmin, ...credentials }: any, req) {
        //logic
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: any) => {
      return session;
    },
  },
};

export default NextAuth(authOptions);
