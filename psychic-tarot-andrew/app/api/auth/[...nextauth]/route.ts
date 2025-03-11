

# app/api/auth/[...nextauth]/route.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: `https://cognito-idp.us-east-2.amazonaws.com/us-east-2_z38ykHCCb`
    })
  ],
  // callbacks, etc.
};

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        // Check if user exists
        const existing = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!existing) {
          // If user doesn't exist, create a new one
          const hash = await bcrypt.hash(credentials.password, 10);
          const newUser = await prisma.user.create({
            data: { email: credentials.email, passwordHash: hash, tokens: 0 }
          });
          return { id: newUser.id + "", email: newUser.email };
        } else {
          // If user exists, verify password
          const match = await bcrypt.compare(credentials.password, existing.passwordHash);
          if (!match) return null;
          return { id: existing.id + "", email: existing.email };
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
