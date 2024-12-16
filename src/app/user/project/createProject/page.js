'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import FormFetch from "@/app/_component/general/FormFetch"
import CardInfo from '@/app/_component/general/CardInfo';
import "@/app/_style/user/project/createProject/pageCreateProject.css"

export default function PageDeliveryNote({ children }) {
  const pathProject = "https://bildy-rpmaya.koyeb.app/api/project";
  const [client, setClient] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const clt = JSON.parse(localStorage.getItem("client"));
    setClient(clt);
  }, []);

  return (
    <div className='createProject'>
      <main>
        <div>
          {(client) && <FormFetch
            message={"CREAR PROYECTO"}
            keys={["name", "projectCode", "street", "code", "email"]}
            path={pathProject}
            method={"POST"}
            clientId={client._id}
            functions={() => {
              router.push(localStorage.getItem("lastPath"))
            }}
          >
            <button type="button" onClick={() => {
              router.push(localStorage.getItem("lastPath"))
            }}>Cancelar</button>
            <button >Crear</button>
          </FormFetch>}
        </div>
      </main>
      <aside>
        <div className="createProject_client-cardIndo">
          <CardInfo data={client} columns={["name", "email", "street", "cif"]} message={"INFORMACION CLIENTE"}></CardInfo>
        </div>
        <div className="createProject_containerButtons">
        </div>
      </aside>

    </div>
  )
}
