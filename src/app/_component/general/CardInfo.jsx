'use client';

import "@/app/_style/general/CardInfo.css";
import NoData from "./NoData";

export default function CardInfo({ data, columns, message, children }) {

    return (
        <>
            {data ? (
                <div className="cardInfo">
                    <h1 className="cardInfo_tittle">{message}</h1>
                    <div className="cardInfo_containter-info">
                        {columns.map((row) => (
                            <div key={row} className="cardInfo-info">
                                {row === "projectId" ? (
                                    <>
                                    <h1>{row}</h1>
                                    <h2>{data[row]["_id"] || "N/A"}</h2>
                                    </>
                                ) : row !== "street" ? (
                                    <>
                                        <h1>{row}</h1>
                                        <h2>{data[row] || "N/A"}</h2>
                                    </>
                                ) : (
                                    <>
                                        <h1>{row}</h1>
                                        <h2>{data.address?.[row] || "N/A"}</h2>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="cardInfo_buttonContainer">
                        {children}
                    </div>

                </div>
            ) : (
                <NoData>NO DATA</NoData>
            )}
        </>)
}
