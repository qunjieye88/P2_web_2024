'use client';
import { useEffect, useState } from "react";
import FormLogin from "@/app/_component/login/FormLogin";
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
    <div className="pageLoginh">
      <FormLogin headers={{ 'Content-Type': 'application/json' }} keys={["email", "password"]}  method={"POST"} path={"https://bildy-rpmaya.koyeb.app/api/user/login"}></FormLogin>
    </div>
  );
}