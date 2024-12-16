'use client'
import { useState, useEffect } from 'react';
import FormUpdate from "@/app/_component/general/FormUpdate"
import { useRouter } from "next/navigation";
import "@/app/_style/user/project/concreteProject/pageConcreteProject.css"

export default function PageProject() {
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
