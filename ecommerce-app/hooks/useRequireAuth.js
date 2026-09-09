"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");

    if (!user) {
      router.replace("/login"); // ✅ better than push
    }
  }, [router]);
}