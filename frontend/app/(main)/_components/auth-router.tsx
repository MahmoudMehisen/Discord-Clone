"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/store/auth-state";

const AuthRouting = () => {
  const { state } = useAuth();

  if (!state.token) {
    setTimeout(() => {
      redirect("/login");
    }, 5000);
  } else {
    return <main>hello</main>;
  }
};

export default AuthRouting;
