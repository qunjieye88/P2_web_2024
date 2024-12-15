import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "@/app/_style/general/Filter.css";

export default function Filter({ data, setLeakedData, keys }) {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState("Filtrar Datos");
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("name");
    console.log(data)

    const handleChange = (info) => {
        const searchValue = info.target.value.toLowerCase();
        setInputValue(searchValue);

        if (searchValue === "") {
            setLeakedData(data);
            setMessage("Filtrar Datos");
        } else {
            const filteredData = data.filter((item) => {
                if (filter === "street") {
                    return item["address"][filter]?.toLowerCase().includes(searchValue)
                } else if (filter === "projectId") {
                    return item["projectId"]["_id"]?.toLowerCase().includes(searchValue)
                } else {
                    return String(item[filter])?.toLowerCase().includes(searchValue)
                }
            });
            setLeakedData(filteredData);

            if (filteredData.length === 0) {
                setMessage("No coincidencias");
            } else {
                setMessage(`${filteredData.length} datos`);
            }
        }
    };

    const handleFilterChange = (info) => {
        setFilter(info.target.value);
    };

    return (
        <div className="filter">
            <div className="filter_select-container">
                <select value={filter} onChange={handleFilterChange}>
                    {keys.map(key => <option value={key} key={key}>{key}</option>)}
                </select>
            </div>
            <div className="filter_input-container">
                <input
                    {...register(filter)}
                    value={inputValue}
                    placeholder={`Filtrar por ${filter}`}
                    onChange={handleChange}
                />
                <p>{message}</p>
            </div>
        </div>
    );
}
