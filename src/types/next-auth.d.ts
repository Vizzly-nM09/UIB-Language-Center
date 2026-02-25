// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string; // Akan disimpan di session token (aman)
    groupId: string;
    groupName: string;
    avatar: string;
    userName: string;
  }

  interface Session {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      groupId: string;
      groupName: string;
      avatar: string; // INI KUNCINYA
      nama: string;
      userName: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    groupId: string;
    groupName: string;
    avatar: string; // INI KUNCINYA
    userName: string;
  }
}