/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import FormUpdate from '@/app/_component/general/FormUpdate';
import { useRouter } from "next/navigation";
import "@/app/_style/user/client/updateClient/pageUpdateClient.css"

import { useState, useEffect, useContext } from 'react';
import FormFetch from "@/app/_component/general/FormFetch"
import NoData from '@/app/_component/general/NoData';


import { ClientContext } from '../layout';
import { UpdateContext } from '../layout';


export default function PageCreateClient() {
    const path = "https://bildy-rpmaya.koyeb.app/api/client"
    const router = useRouter();
    const { client, setClient } = useContext(ClientContext);
    const { update, setUpdate } = useContext(UpdateContext);

    

    return (
        <div className='updateClient'>
            <main>
                <div className='updateClient_formFetch'>
                    <FormUpdate
                        keys={["name", "street", "cif"]}
                        message={"ACTUALIZAR CLIENTE"}
                        method={"POST"}
                        path={path}
                        dataUpdate={client}
                        functions={() => {
                            router.push("/user/client")
                            setUpdate(true)
                        }}
                    >
                        <button onClick={() => { router.push("/user/client") }}>CANCELAR</button>
                        <button onClick={() => { router.push("/user/client") }}>GUARDAR CAMBIOS</button>
                    </FormUpdate>
                </div>
            </main>
            <aside>
                <div className='updateClient_formFetch'>
                    {client ? <FormFetch
                        functions={() => {
                            setUpdate(true)
                            router.push("/user/client")
                        }} 
                        keys={["image"]}
                        message={"FOTO PERFIL"}
                        method={"PATCH"}
                        path={`${path}/logo/${client._id}`}>
                        <button>enviar</button>
                    </FormFetch> : <NoData>No DATA</NoData>}
                </div>
            </aside>
        </div>
    );
}
