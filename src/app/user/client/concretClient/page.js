/* eslint-disable react-hooks/rules-of-hooks */
'use client'
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

  return (
    <div className='client'>
    </div>
  )
}
