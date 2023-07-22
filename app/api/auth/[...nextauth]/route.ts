import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import { connectToDB } from "@/utils/database";

import User from "@/models/user";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ user }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({
          email: user.email,
        });

        if (!userExists) {
          await User.create({
            email: user.email,
            username: user.name,
            image: user.image,
          });
        }

        return true;
      } catch (err: any) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
