'use client'
import Card from "../../general/Card"
import "@/app/_style/user/client/SliderClients.css"
import NoData from "../../general/NoData"

export default function SliderClients({clients, setData}) {

    const columns = ["name", "street"]
    const clientes = clients && clients.length > 0 ? (clients.map(client => <Card key ={client._id}functions={()=>{
        console.log(client)
        setData(client)}} columns ={columns} data={client}></Card>)) : (<NoData>NO DATA</NoData>)

    return (
        <div className="sliderClients">
            
            <div className="sliderClients_container-info">
                <h1 className="sliderClients_title">CLIENTES</h1>
                <h2 className="sliderClients_info">Pincha en un cliente</h2>
            </div>
            {clientes}
        </div>
    )
}