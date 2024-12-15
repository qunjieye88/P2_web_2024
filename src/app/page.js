'use client';
import { useEffect, useState } from "react";
import FormFetch from "@/app/_component/login/FormLogin";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/user");
    }
  }, []);
   
  return (
      <FormFetch headers={{ 'Content-Type': 'application/json' }} keys={["email", "password"]}  method={"POST"} path={"https://bildy-rpmaya.koyeb.app/api/user/login"}></FormFetch>

  );
}