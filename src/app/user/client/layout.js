/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect, createContext } from 'react';
import "../../_style/user/client/layautClient.css";
import { fetchUtil } from '@/app/_utils/fetch';
import SliderClients from "@/app/_component/general/client/SliderClients";
import Filter from '@/app/_component/general/Filter';
import { useRouter } from "next/navigation";

export const ClientContext = createContext();
export const UpdateContext = createContext();

export default function layoutClient({ children }) {
  const router = useRouter();
  const path = "https://bildy-rpmaya.koyeb.app/api/client";
  const [clients, setClients] = useState([]);
  const [clientsFiltered, setClientsFiltered] = useState([]);
  const [client, setClient] = useState(null);
  const [update, setUpdate] = useState(false);

  const sincroniceData = async () => {
    const result = await fetchUtil(path, "GET");
    if(result){
      setClients(result);
      setClientsFiltered(result);
      if(update && client){
        const data = result.find(clt => client._id === clt._id)
        client && (setClient(data))
        setUpdate(false)
      }
    }
  };

  useEffect(() => {
    sincroniceData();
  }, [update]);


  return (
    <div className='client'>
      <aside>
        <div className='client_filter'>
          <Filter keys={["name", "street"]} data={clients} setLeakedData={setClientsFiltered}></Filter>
        </div>
        <button onClick={() => router.push("/user/client/createClient")}>
          CREAR CLIENTE
        </button>
        <div className='client_sliderClients'>
          <SliderClients clients={clientsFiltered} setData={setClient}></SliderClients>
        </div>
      </aside>
      <main>
        <UpdateContext.Provider value={{ update, setUpdate }}>
          <ClientContext.Provider value={{ client, setClient }}>
            {children}
          </ClientContext.Provider>
        </UpdateContext.Provider>
      </main>
    </div>
  );
}
