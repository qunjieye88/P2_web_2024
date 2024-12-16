/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { GetData } from "@/app/_utils/fetch";
import NoData from "../_component/general/NoData";
import { useState } from "react";
export default function pageUsuario() {

  const [user, setUser] = useState(null)

  const fetchData = async () => {
    const path = "https://bildy-rpmaya.koyeb.app/api/user";
    const token = localStorage.getItem("token");
    const user = await GetData(path, token);
    setUser(user)
  };

  return (
    <NoData>NO HAY DATOS USUARIO</NoData>
  );
}