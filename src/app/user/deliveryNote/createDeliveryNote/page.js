'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import FormFetch from "@/app/_component/general/FormFetch"

export default function PageDeliveryNote({ children }) {
    const clientPath = "https://bildy-rpmaya.koyeb.app/api/client";
    const pathProject = "https://bildy-rpmaya.koyeb.app/api/project";
    const deliverynote = "https://bildy-rpmaya.koyeb.app/api/deliverynote";
    const [project, setProject] = useState(null);
    const [client, setClient] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const prj = JSON.parse(localStorage.getItem("project"));
        setProject(prj);
        const clt = JSON.parse(localStorage.getItem("client"));
        setClient(clt);
    }, []);

    return (
        <div className='createDeliveryNote'>
            <div className='createDeliveryNote_formFetch'>
                {(client && project) && <FormFetch
                    message={"CREAR ALBARAN"}
                    keys={["format", "material", "hours", "description", "workdate"]}
                    path={deliverynote}
                    method={"POST"}
                    clientId={client._id}
                    projectId={project._id}
                    functions={()=>{router.push("/user/deliveryNote")}}
                >
                    <button>ENVIAR</button>
                </FormFetch>}
            </div>
        </div>
    )
}
