'use client'
import Card from "../Card"
import NoData from "../NoData"
import "@/app/_style/user/client/SliderClients.css"

export default function SliderClients({ clients, setData }) {

    const columns = ["name", "street"]

    return (
        <div className="sliderClients">

            <div className="sliderClients_container-info">
                <h1 className="sliderClients_title">CLIENTES</h1>
                <h2 className="sliderClients_info">Pincha en un cliente</h2>
            </div>
            {clients && clients.length > 0 ? (clients.map(client => <Card key={client._id} functions={() => {
                setData(client)
            }} columns={columns} data={client}></Card>)) : (<NoData>NO DATA</NoData>)}
        </div>
    )
}