'use client'
import { useState, useEffect } from 'react';
import { fetchUtil } from '@/app/_utils/fetch';
import DataTable from '@/app/_component/general/DataTable.jsx';
import Filter from '@/app/_component/general/Filter';
import FormUpdate from "@/app/_component/general/FormUpdate"
import OverlayContent from "@/app/_component/general/OverlayContent"
import { infoProyecto } from '@/app/_utils/searchData';
import { useRouter } from "next/navigation";
import CardInfo from '@/app/_component/general/CardInfo';
import "@/app/_style/user/project/concreteProject/layoutConcreteProject.css"

export default function PageProject({ children }) {
    const clientPath = "https://bildy-rpmaya.koyeb.app/api/client";
    const [client, setClient] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const projectData = JSON.parse(localStorage.getItem("project"));
        if (projectData) {
            getClient(projectData.clientId);
        }

    }, []);

    const getClient = async (clientId) => {
        const result = await fetchUtil(`${clientPath}/${clientId}`);
        localStorage.setItem("client",JSON.stringify(result))
        setClient(result);
    };

    return (
        <div className='layoutConcreteProject'>
            <div className='layoutConcreteProject_project-data'>
                {children}
            </div>
            <aside>
                <div className="layoutConcreteProject_client-cardIndo">
                    <CardInfo data={client} columns={["name","email","street", "cif"]} message={"INFORMACION CLIENTE"}></CardInfo>
                </div>
                <div className="layoutConcreteProject_containerButtons">
                    <button onClick={()=>{router.push("/user/deliveryNote/createDeliveryNote")}}>Crear Albaran</button>
                </div>
            </aside>
        </div>
    )
}
