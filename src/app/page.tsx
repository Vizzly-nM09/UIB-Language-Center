"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { data, status }: { data: any; status: string } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  });
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg text-[#F8B600]"></span>
        <p className="text-[#F8B600]">Loading...</p>
      </div>
    </>
  );
}
