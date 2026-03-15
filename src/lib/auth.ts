import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn({ profile }) {
      // Only allow the specific GitHub user
      return profile?.login === process.env.ALLOWED_GITHUB_USER;
    },
    session({ session }) {
      return session;
    },
  },
  session: { strategy: "jwt" },
  trustHost: true,
});
