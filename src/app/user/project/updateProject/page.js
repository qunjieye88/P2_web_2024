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
import "@/app/_style/user/project/concreteProject/pageConcreteProject.css"

export default function PageProject() {
    const clientPath = "https://bildy-rpmaya.koyeb.app/api/client";
    const pathProject = "https://bildy-rpmaya.koyeb.app/api/project";
    const [project, setProject] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const projectData = JSON.parse(localStorage.getItem("project"));
        setProject(projectData);
    }, []);

    return (
        <div className='concreteProject'>
            <div className='concreteProject_project-data'>
                <FormUpdate 
                dataUpdate={project} 
                keys={["name", "street", "projectCode","code","email"]} 
                message={"INFORMACION PROYECTO"} 
                path={pathProject} 
                functions={() => {
                    router.push(localStorage.getItem("lastPath"))}}>
                    <button type ="button" onClick={()=>{
                        router.push(localStorage.getItem("lastPath"))}}>Salir</button>
                    <button>Actualizar</button>
                </FormUpdate>
            </div>
        </div>
    )
}
