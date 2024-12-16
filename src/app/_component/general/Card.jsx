'use client'
import Image from "next/image"
import NoImage from "@/app/_image/noFoto.png"
import "@/app/_style/general/Card.css"
import { fetchUtil } from "@/app/_utils/fetch"
import { useEffect, useState } from "react"


export default function Card({ data, columns, functions }) {


    return (
        <div className="card" onClick={functions && (() => functions())}>
            <Image
                className="card_image"
                alt="NO EXISTE"
                src={data.logo ? data.logo : NoImage}
                width={150}
                height={150}
                priority
            />
            <div className="card_container-data">
                {columns.map((column, colIndex) => {
                    if (column != "street") {
                        return data[column] && data[column] ? (<h1 className="card_info" key={colIndex} >{data[column]}</h1>) : (<h1 key={colIndex}>N/A</h1>)
                    } else {
                        return data["address"][column] && data["address"][column] ? (<h1 className="card_info" key={colIndex} >{data["address"][column]}</h1>) : (<h1 key={colIndex}>N/A</h1>)
                    }
                })}
            </div>
        </div>
    )
}