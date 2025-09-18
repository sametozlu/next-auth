import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Auth0Provider({
      issuer: process.env.AUTH0_ISSUER,
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist Auth0 roles if available via a custom namespace or roles claim
      if (account?.provider === "auth0" && profile) {
        const rolesNamespace = process.env.AUTH0_ROLES_NAMESPACE || "";
        const namespaced = rolesNamespace
          ? (profile as any)[rolesNamespace]
          : undefined;
        const roles =
          (Array.isArray(namespaced?.roles) && namespaced.roles) ||
          (Array.isArray((profile as any).roles) && (profile as any).roles) ||
          [];
        (token as any).roles = roles;
      }
      return token;
    },
    async session({ session, token }) {
      const roles = (token as any).roles || [];
      (session as any).user = {
        ...(session.user || {}),
        roles,
      };
      return session;
    },
  },
});

export { GET, POST };


