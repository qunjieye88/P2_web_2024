'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useEffect } from 'react';
import { updateData, createJson,fetchUtil } from "@/app/_utils/fetch";
import "../../_style/general/Form.css"
import { useState } from 'react';

export default function FormUpdate({ path, keys, dataUpdate, functions, message, children}) {
    
    const [error, setError] = useState("");
    const SignSquema = Yup.object(
        keys.reduce((schema, field) => {
            if (field === "email") {
                schema[field] = Yup.string().email("Email inválido").required("El email es obligatorio");
            } else if (field === "password") {
                schema[field] = Yup.string()
                    .min(8, "Mínimo 8 caracteres")
                    .required("La contraseña es obligatoria");
            } else {
                schema[field] = Yup.string().required(`El campo ${field} es obligatorio`);
            }
            return schema;
        }, {})
    );

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema),
    });

    const onSubmit = async (data) => {
        const json = createJson(data, keys);
        const result = await fetchUtil(`${path}/${dataUpdate._id}`, "PUT", json);
        if (result instanceof Error) {
            if (result.message.includes("422")) {
                setError("Datos incorrectos");
            }else if(result.message.includes("409")){
                setError("Ya existe cuenta");
            }
        }else {
            functions && functions()  
            setError("");
        }
        if(result["token"]){
            localStorage.setItem("token",result["token"]);
            router.push("/register/entercodeverification");
        }else if(result["acknowledged"]){
            router.push("/");
        }
        
    };

    useEffect(() => {
        if (dataUpdate) {
            reset(dataUpdate);
        }
    }, [dataUpdate, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 >{message}</h1>
            <div className="input_container">
                    {
                        keys.map((row) => (
                            <div key={row} className="input-updatetable">
                                {row !== "street" ? (
                                    <>
                                        <h2 htmlFor={row}>{row}</h2>
                                        <input
                                            {...register(row)}
                                            id={row}
                                            placeholder={`Ingresa tu ${row}`}
                                            defaultValue={dataUpdate ? dataUpdate[row] : ""}
                                        />
                                        {errors[row] && <p className="error-message">{errors[row].message}</p>}
                                    </>
                                ) : (
                                    <>
                                        <h2 htmlFor={row}>{row}</h2>
                                        <input
                                            {...register(row)}
                                            id={row}
                                            placeholder={`Ingresa tu ${row}`}
                                            defaultValue={dataUpdate ? dataUpdate["address"][row] : ""}
                                        />
                                        {errors[row] && <p className="error-message">{errors[row].message}</p>}
                                    </>
                                )}
                            </div>
                        ))
                    }
            </div>

            <div className="buttonContainer">
                {children}
            </div>
            
            {error && <p className="error-message">{error}</p>}

        </form>
    );
}
