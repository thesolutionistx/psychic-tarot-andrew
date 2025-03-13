import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Configure NextAuth. If you have additional providers or custom settings in your repo,
// include them here or import them from another module.
const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // Add more providers here if needed.
  ],
  // Optional: Use JWT session strategy if required.
  session: {
    strategy: "jwt",
  },
  // Optional: Custom callbacks can be added here.
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the accessToken to the session if available.
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
  // Optional: Additional NextAuth configuration (pages, debug, etc.) can be added here.
};

// Create the NextAuth handler.
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests as required by the App Router.
export { handler as GET, handler as POST };
