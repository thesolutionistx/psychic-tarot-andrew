import NextAuth from "next-auth";

// Extend built-in types for Session and JWT
declare module "next-auth" {
  interface Session {
    user: {
      id: number | string;
      email: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
