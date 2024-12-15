import { useState, useEffect } from 'react';

export function infoProyecto({ proyectos }) {  // Asegúrate de recibir proyectos como prop
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);  // Estado para indicar que los datos están cargando

    console.log("proyectos", proyectos);

    useEffect(() => {
        // Solo se ejecuta si proyectos tiene datos
        if (proyectos.length > 0) {
            const fetchClients = proyectos.map((client) =>
                fetch(`https://bildy-rpmaya.koyeb.app/api/client/${client["_id"]}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then((respuesta) => respuesta.json())
                    .then(dato => dato)
                    .catch((error) => {
                        console.error("Error fetching client data:", error);
                        return null;
                    })
            );

            // Esperar todas las promesas y actualizar el estado
            Promise.all(fetchClients)
                .then((clientesData) => {
                    setClients(clientesData.filter(client => client !== null)); // Filtramos posibles valores nulos
                    setLoading(false); // Cambiar el estado de cargado a false
                });
        }
    }, []);  // Dependencia en proyectos

    if (loading) {
        return <p>Cargando...</p>;  // Mostrar mensaje mientras cargan los datos
    }

    return (
        <>
            <thead>
                <tr>
                    <td>Code</td>
                    <td>Created At</td>
                    <td>Name</td>
                    <td>Project Code</td>
                    <td>Cliente</td>
                    <td>ESTADO</td>
                </tr>
            </thead>
            <tbody>
                {proyectos.map((row, index) => (
                    <tr key={row._id}>  {/* Usa el _id como clave única */}
                        <td>{row["code"]}</td>
                        <td>{row["createdAt"]}</td>
                        <td>{row["name"]}</td>
                        <td>{row["projectCode"]}</td>
                        {/* Muestra el nombre del cliente si está disponible */}
                        <td>{clients[index] ? clients[index].name : 'No disponible'}</td>
                        {row["active"] && <td>ACTIVO</td>}
                        {row["deleted"] && <td>DELETED</td>}
                    </tr>
                ))}
            </tbody>
        </>
    );
}
