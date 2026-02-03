import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma"; // Relative path to our singleton Prisma Client
import bcrypt from "bcryptjs";

/**
 * NextAuth Configuration
 * Defines authentication providers, callbacks, and session strategies.
 */
const handler = NextAuth({
  providers: [
    // Configure Email/Password Login Strategy
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // The 'authorize' function is the core logic for verifying credentials
      async authorize(credentials) {
        // 1. Validation: Ensure email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing login data");
        }

        // 2. Database Lookup: Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user is found, reject the login
        if (!user) {
          throw new Error("User not found");
        }

        // 3. Password Verification: Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        // 4. Success: Return the user object
        // NOTE: This object is passed to the 'jwt' callback below
        return {
          id: user.id,
          name: user.name, // We explicitly return the name here
          email: user.email,
        };
      },
    }),
  ],

  // --- CALLBACKS: Critical for passing data to the Frontend ---
  callbacks: {
    // 1. JWT Callback: Triggered when a user signs in.
    // We persist custom data (like 'name' and 'id') into the JWT token here.
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },

    // 2. Session Callback: Triggered when 'useSession()' is called on Frontend.
    // We transfer data from the Token to the Session object so the UI can access it.
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        // session.user.id = token.id as string; // Optional: Uncomment if you need ID in frontend
      }
      return session;
    },
  },
  // ------------------------------------------------------------

  pages: {
    signIn: "/login", // Redirects here if unauthenticated
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Used to sign/encrypt tokens
});

// Export handlers for Next.js App Router (GET/POST)
// Note: 'as any' is a workaround for strict type checking in Next.js 15+
export const GET = handler as any;
export const POST = handler as any;