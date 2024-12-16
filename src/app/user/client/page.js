/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect, useContext } from 'react';
import "../../_style/user/client/pageClient.css"
import { fetchUtil } from '@/app/_utils/fetch';
import DataTable from '@/app/_component/general/DataTable.jsx';
import CardInfo from '@/app/_component/general/CardInfo';
import { useRouter } from "next/navigation";
import { ClientContext } from './layout';

export default function PageClient() {
    const { client, setClient } = useContext(ClientContext);
    const [projects, setProjects] = useState([]);
    const [clientProjects, setClientProjects] = useState([]);
    const [project, setProject] = useState(null);
    const pathProject = "https://bildy-rpmaya.koyeb.app/api/project"
    const router = useRouter();

    const updateProject = async () => {
        const result = await fetchUtil(pathProject, "GET")
        if (result) {
            setProjects(result)
        }
    }
    useEffect(() => {
        updateProject()
    }, [])

    useEffect(() => {
        if(project){
            localStorage.setItem("project",  JSON.stringify(project))
        }
    }, [project])

    useEffect(() => {

        const result = projects.filter(project => project.clientId === client._id)
        setClientProjects(result)
        localStorage.setItem("client", JSON.stringify(client))
    }, [client])

    return (
        <div className='pageClient'>
            <div className='pageClient_cardInfo'>
                <CardInfo
                    message={"INFORMACION CLIENTE"}
                    data={client}
                    columns={["name", "cif", "street", "activeProjects"]}
                >
                    <button onClick={() => {
                        router.push("/user/client/updateClient")
                    }}>
                        EDITAR
                    </button >
                    <button onClick={() => {
                        router.push("/user/project/createProject")
                    }}>
                        CREAR PROYECTO
                    </button>
                </CardInfo></div>
            <div className='pageClient_dataTable'>
                <DataTable info={clientProjects}
                    columns={["name", "code", "email", "street", "createdAt"]}
                    setData={setProject}
                    addFunction={() => {
                        router.push("/user/project/updateProject")
                    }}>
                </DataTable>
            </div>
        </div>
    );
}
