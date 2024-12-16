/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect,useContext } from 'react';
import FormFetch from "@/app/_component/general/FormFetch"
import { useRouter } from "next/navigation";
import "@/app/_style/user/client/createClient/pageCreateClient.css"

import { ClientContext } from '../layout';
import { UpdateContext } from '../layout';

export default function PageCreateClient() {
    const path = "https://bildy-rpmaya.koyeb.app/api/client"
    const router = useRouter();
    const { update, setUpdate } = useContext(UpdateContext);

    return (
        <div className='createClient'>
            <main>
                <div className='createClient_formFetch'>
                    <FormFetch
                        keys={["name", "street", "cif"]}
                        message={"CREAR CLIENTE"}
                        method={"POST"}
                        path={path}
                        functions={()=>{
                            router.push("/user/client")
                            setUpdate(true)
                        }}
                    >
                        <button type ="button" onClick={() => {router.push("/user/client")}} >CANCELAR</button>
                        <button >CREAR CLIENTE</button>
                    </FormFetch>
                </div>
            </main>
            <aside>
                <div className='createClient_formFetch'>
                </div>
            </aside>
        </div>
    );
}
