import React, { useState, useEffect } from 'react';
import { fetchUtil } from '@/app/_utils/fetch';

export default function FetchPDF({ path }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {

    fetchAndDisplayPDF();
  }, [path]);

  const fetchAndDisplayPDF = async () => {
    const pdf = await fetchUtil(path, "GET")
    const blob = await pdf.blob();
    const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    setPdfUrl(url)

  };


  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'archivo.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  return (
    <div>
      {pdfUrl ? (
        <div>
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            title="PDF Viewer"
          />
          <button onClick={downloadPDF}>Descargar PDF</button>
        </div>
      ) : (
        <p>Cargando el PDF...</p>
      )}
    </div>
  );
}
