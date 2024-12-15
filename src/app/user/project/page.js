'use client'
import { useState, useEffect } from 'react';
import "../../_style/user/client/pageClient.css"
import { fetchUtil } from '@/app/_utils/fetch';
import DataTable from '@/app/_component/general/DataTable.jsx';
import "@/app/_style/user/project/pageProject.css"
import Filter from '@/app/_component/general/Filter';
import FormUpdate from "@/app/_component/general/FormUpdate"
import OverlayContent from "@/app/_component/general/OverlayContent"
import { infoProyecto } from '@/app/_utils/searchData';



export default function PageProject() {
  const pathProject = "https://bildy-rpmaya.koyeb.app/api/project";

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [projectsFiltered, setProjectsFiltered] = useState([]);

  const sincroniceProject = async () => {
    const result = await fetchUtil(pathProject, "GET");
    setProjects(result);
    setProjectsFiltered(result)
  };
  useEffect(() => {
    sincroniceProject();
  }, []);

  const updateData = project && <FormUpdate
    functions={() => {
      setProject(null)
      sincroniceProject()
    }}
    path={pathProject}
    keys={["name", "projectCode", "street", "code", "email", "createdAt", "updatedAt"]}
    message={"ACTUALIZAR PROYECTO"}
    setUpdateData={setProject}
    dataUpdate={project}
  >
    <button type="button" onClick={() => setProject(false)}>Cancelar</button>
    <button>Actualizar</button>
  </FormUpdate>


  const overlay = (project) && <OverlayContent>{updateData}</OverlayContent>

  return (
    <div className='project'>
      {overlay}
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
