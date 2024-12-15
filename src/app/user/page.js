/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { GetData } from "@/app/_utils/fetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function pageUsuario() {

  const [user, setUser] = useState(null)
  const router = useRouter();

  const fetchData = async () => {
    const path = "https://bildy-rpmaya.koyeb.app/api/user";
    const token = localStorage.getItem("token");
    const user = await GetData(path, token);
    setUser(user)
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
    fetchData();
  }, []);



  return (
    <></>
  );
}