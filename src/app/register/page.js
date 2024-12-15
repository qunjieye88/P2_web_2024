/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormFetch from "@/app/_component/general/FormFetch"


export default function pageRegister() {

  
  return (
    <>
    <FormFetch
      path={"https://bildy-rpmaya.koyeb.app/api/user/register"}
      keys={["email", "password"]}
      method={"POST"}
      functions={()=>{}}
      message={"REGISTER"}>
        <button type="button">Ya tengo cuenta</button>
    </FormFetch>
    </>
  );
}