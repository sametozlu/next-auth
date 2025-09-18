import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import type { JWT } from "next-auth/jwt";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

const authSetup = NextAuth({
  providers: [
    Auth0Provider({
      issuer: process.env.AUTH0_ISSUER,
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "auth0" && profile) {
        const profileObj = profile as Record<string, unknown>;
        const rolesNamespace = process.env.AUTH0_ROLES_NAMESPACE || "";

        let roles: string[] = [];

        if (rolesNamespace && typeof profileObj[rolesNamespace] === "object" && profileObj[rolesNamespace] !== null) {
          const namespacedObj = profileObj[rolesNamespace] as Record<string, unknown>;
          const candidate = namespacedObj["roles"] as unknown;
          if (isStringArray(candidate)) {
            roles = candidate;
          }
        }

        if (roles.length === 0) {
          const candidate = profileObj["roles"] as unknown;
          if (isStringArray(candidate)) {
            roles = candidate;
          }
        }

        (token as JWT & { roles?: string[] }).roles = roles;
      }
      return token;
    },
    async session({ session, token }) {
      const roles = (token as JWT & { roles?: string[] }).roles ?? [];
      session.user = {
        ...(session.user || {}),
        // Extend session user with roles without using any
        roles,
      } as typeof session.user & { roles: string[] };
      return session;
    },
  },
});

export const { auth, signIn, signOut } = authSetup;
export const handlers = authSetup.handlers;


