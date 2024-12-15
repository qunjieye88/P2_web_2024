import React from 'react';

export default function FetchPDF({path}) {
  const fetchAndDownloadPDF = async () => {
    try {
      const response = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error('No se pudo descargar el PDF');
      }
      console.log(response)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'archivo.pdf'); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchAndDownloadPDF}>Descargar PDF</button>
    </div>
  );
}
