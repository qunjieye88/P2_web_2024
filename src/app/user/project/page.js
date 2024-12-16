'use client'
import { useState, useEffect } from 'react';
import { fetchUtil } from '@/app/_utils/fetch';
import DataTable from '@/app/_component/general/DataTable.jsx';
import "@/app/_style/user/project/pageProject.css"
import Filter from '@/app/_component/general/Filter';
import { useRouter } from "next/navigation";


export default function PageProject() {
  const pathProject = "https://bildy-rpmaya.koyeb.app/api/project";

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [projectsFiltered, setProjectsFiltered] = useState([]);
  const router = useRouter();


  useEffect(() => {
    sincroniceProject();
  }, []);

  const sincroniceProject = async () => {
    const result = await fetchUtil(pathProject, "GET");
    setProjects(result);
    setProjectsFiltered(result)
  };

  
  useEffect(() => {
    if(project){
      localStorage.setItem("project",JSON.stringify(project))
      router.push("/user/project/updateProject");
    }
  }, [project]);

  return (
    <div className='project'>
      <header>
        <div className='project_filter'>
          <Filter
            setLeakedData={setProjectsFiltered}
            data={projects}

            keys={["name", "projectCode", "street", "code", "email", "createdAt", "updatedAt"]}
          />
        </div>
      </header>
      <main>
        <DataTable
          info={projectsFiltered}
          columns={["name", "projectCode", "street", "code", "email", "createdAt", "updatedAt"]}
          setData={setProject}
        />
      </main>
    </div>
  )
}
