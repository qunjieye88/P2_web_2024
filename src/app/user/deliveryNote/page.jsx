'use client'
import { useState, useEffect } from 'react';
import "../../_style/user/deliveryNote/deliveryNote.css"
import { fetchUtil } from '@/app/_utils/fetch';
import DataTable from '@/app/_component/general/DataTable.jsx';
import Filter from '@/app/_component/general/Filter';
import OverlayContent from "@/app/_component/general/OverlayContent"
import DownloadPdf from '@/app/_component/general/DownloadPdf';

export default function PageProject() {
  const pathDeliveryNote = "https://bildy-rpmaya.koyeb.app/api/deliverynote";

  const columns = ["clientId", "projectId", "format", "material", "hours", "description", "workdate"]
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [deliveryNotesFiltered, setDeliveryNotesDiltered] = useState([]);
  const [deliveryNote, setDeliveryNote] = useState(null);

  const [downloadPdfState, setDownloadPdfState] = useState(false);
  const [pdf, setPdr] = useState("");

  const sincroniceProject = async () => {
    const result = await fetchUtil(pathDeliveryNote, "GET");
    setDeliveryNotes(result);
    setDeliveryNotesDiltered(result)
  };
  useEffect(() => {
    sincroniceProject();
  }, []);


  const downloadPdf = deliveryNote && <DownloadPdf path = {`${pathDeliveryNote}/pdf/${deliveryNote._id}`}></DownloadPdf>
  const overlay = (deliveryNote) && <OverlayContent><div>{downloadPdf}</div></OverlayContent>

  return (
    <div className='deliveryNote'>
      <header>
        <div className='deliveryNote_filter'>
          <Filter
            setLeakedData={setDeliveryNotesDiltered}
            data={deliveryNotes}
            keys={["clientId", "projectId", "format", "material", "hours", "description", "workdate"]}></Filter>
        </div>
      </header>
      <main>
        <DataTable
          info={deliveryNotesFiltered}
          columns={columns}
          setData={setDeliveryNote}
        />
      </main>
      {overlay}
    </div>
  )
}
