import axios from "axios";
import { refreshAccessToken } from "@/lib/refreshAccessToken";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours in seconds
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.SERVICE_URL}/v1/login`,
            credentials
          );

          const data = res.data;
          console.log("Login response data:", data);
          if (data.status === 200 && data?.accessToken) {
            return data;
          } else {
            throw new Error("Username atau password salah");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (user) {
        return {
          ...token,
          nama: user.userName,
          userId: user.userId,
          groupId: user.groupId,
          groupName: user.groupName,
          avatar: user.profilePicture,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpiresAt: new Date(user.accessTokenExpiresAt).getTime(),
        };
      }

      const now = Date.now();
      if (!token.accessTokenExpiresAt || now < token.accessTokenExpiresAt) {
        return token;
      }

      const refreshed = await refreshAccessToken(token);

      if (refreshed?.error) {
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }

      return refreshed;
    },

    async session({ session, token }: any) {
      session.user = {
        ...session.user,
        nama: token.nama,
        userId: token.userId,
        groupId: token.groupId,
        groupName: token.groupName,
        avatar: token.avatar,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
