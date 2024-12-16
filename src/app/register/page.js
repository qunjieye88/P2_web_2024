/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormFetch from "@/app/_component/general/FormFetch"


export default function pageRegister() {
  const router = useRouter()

  
  return (
    
    <div className="pageLoginh">
    <FormFetch
      path={"https://bildy-rpmaya.koyeb.app/api/user/register"}
      keys={["email", "password"]}
      method={"POST"}
      functions={()=>{}}
      message={"REGISTER"}>
        <button type="button" onClick={()=>{router.push("/")}}>Ya tengo cuenta</button>
        <button >Registrar</button>
    </FormFetch>
    </div>
  );
}