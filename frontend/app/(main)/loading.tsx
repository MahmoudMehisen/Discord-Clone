"use client";

import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "@/store/auth-state";
import { useRouter } from "next/navigation";

function Loading() {
  const { state } = useAuth();
  const router = useRouter();

  if (!state.token) {
    router.push("/login");
  }
  return (
    <div className="flex items-center justify-center w-full h-full">
      <ImSpinner2 className="animate-spin h-12 w-12" />
    </div>
  );
}

export default Loading;
