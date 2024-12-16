'use client';
import React from 'react';
import "@/app/_style/general/DataTable.css"
import NoData from './NoData';
export default function DataTable({ info, columns, setData, addFunction}) {

    const onclick = (data)=>{
        setData && setData(data)
        addFunction && addFunction() 
    }

    return (
        <>
            {info && info.length > 0 ? (
                <div className='dataTable'>
                    <table className="dataTable_table">
                        <thead>
                            <tr >
                                {columns.map((column, index) => 
                                   <th key={index} >{column}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {info.map((row, index) => (
                                <tr key={index} onClick={()=>onclick(row)} >
                                    {columns.map((column, colIndex) => {
                                        if(column === "projectId"){
                                            return <td key={colIndex}>{row[column]["_id"]}</td>
                                        } else if (column != "street") {
                                            return <td key={colIndex}>{row[column]}</td>
                                        } else {
                                            return <td key={colIndex} >{row["address"][column]}</td>
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )
                : (<NoData>NO DATA</NoData>)}
        </>
    );
}

