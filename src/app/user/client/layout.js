/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect } from 'react';
import "../../_style/user/client/pageClient.css"
import { fetchUtil } from '@/app/_utils/fetch';
import SliderClients from "@/app/_component/user/client/SliderClients"
import DataTable from '@/app/_component/general/DataTable.jsx';
import CardInfo from '@/app/_component/general/CardInfo';
import OverlayContent from "@/app/_component/general/OverlayContent"
import FormFetch from "@/app/_component/general/FormFetch"
import FormUpdate from '@/app/_component/general/FormUpdate';
import Filter from '@/app/_component/general/Filter';

export default function pageUsuario() {

  const path = "https://bildy-rpmaya.koyeb.app/api/client"
  const pathProject = "https://bildy-rpmaya.koyeb.app/api/project"
  const [clients, setClients] = useState([]);
  const [clientsFiltered, setClientsFiltered] = useState([]);
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [createProjectState, setCreateProjectState] = useState(false)
  const [clientCreated, setClientCreated] = useState(false)
  const [clientUpdate, setClientUpdate] = useState(false)

  useEffect(() => {
    sincroniceData()
  }, [])

  useEffect(() => {
    sincroniceProject()
  }, [client])

  const sincroniceData = async () => {
    const result = await fetchUtil(path, "GET")
    setClients(result)
    setClientsFiltered(result)
    client && setClient(result.find(x => client._id == x._id))
  }

  const sincroniceProject = async () => {
    if (client) {
      const result = await fetchUtil(pathProject, "GET")
      if (result) {
        const projects = result.filter(x => x.clientId === client._id)
        setProjects(projects)
      }
    }
  }

  const createproject = createProjectState && <FormFetch
    keys={["name", "projectCode", "street", "code", "email"]}
    path={pathProject}
    method={"POST"}
    functions={() => {
      setCreateProjectState(false)
      sincroniceProject()
    }}
    clientId={client._id}
    message={"PROYECTO CLIENTE"}
  >
    <button type="button" onClick={() => setCreateProjectState(false)}>Cancelar</button>
    <button>Crear</button>
  </FormFetch>

  const clientcreated = clientCreated && <FormFetch
    keys={["name", "cif", "street"]}
    method={"POST"}
    path={path}
    functions={() => {
      setClientCreated(false)
      sincroniceData()
    }}
    message={"CREAR CLIENTE"}
  >
    <button type="button" onClick={() => setClientCreated(false)}>Cancelar</button>
    <button>Crear</button>
  </FormFetch>

  const updateClient = clientUpdate && <FormUpdate
    keys={["name", "cif", "street"]}
    path={path}
    functions={() => {
      setClientUpdate(false)
      sincroniceData()
    }}
    setUpdateData={setClient}
    dataUpdate={client}
    message={"ACTUALIZAR CLIENTE"}
  >
    <button type="button" onClick={() => setClientUpdate(false)}>Cancelar</button>
    <button>Actualizar</button>
  </FormUpdate>

  const updateproject = project && <FormUpdate
    functions={() => {
      setProject(null)
      sincroniceProject()
    }}
    path={pathProject}
    keys={["name", "projectCode", "street", "code", "email"]}
    message={"ACTUALIZAR PROYECTO"}
    setUpdateData={setProject}
    dataUpdate={project}
  >
    <button type="button" onClick={() => setProject(false)}>Cancelar</button>
    <button>Actualizar</button>
  </FormUpdate>


  const over = (createProjectState || clientcreated || clientUpdate || project) &&
    <OverlayContent>
      {createproject}
      {clientcreated}
      {updateClient}
      {updateproject}
    </OverlayContent>


  return (
    <div className='client'>
      <div className='client_sidebar-container'>
        <div className='slider_filter'>
          <Filter keys={["name", "street"]} data={clients} setLeakedData={setClientsFiltered}></Filter>
        </div>
        <button onClick={() => { setClientCreated(true) }}>CREAR CLIENTE</button>
        <div className='slider-clients'>
          <SliderClients clients={clientsFiltered} setData={setClient}></SliderClients>
        </div>
      </div>
      <div className='container-client'>
        <div className='container-upload'>
          <CardInfo message={client && client.name} data={client} columns={["_id", "name", "cif", "street"]}>
            <button onClick={() => { setClientUpdate(true) }}>EDITAR CLIENTE</button>
            <button onClick={() => { setCreateProjectState(true) }}>CREAR PROYECTO</button>
          </CardInfo>
        </div>
        <div className='container-project'>
          <DataTable columns={["_id", "name", "projectCode", "street", "code", "email"]} info={projects} setData={setProject}></DataTable>
        </div>
      </div>
      {over}
    </div>
  )
}
