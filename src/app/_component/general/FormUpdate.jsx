'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useEffect } from 'react';
import { updateData, createJson } from "@/app/_utils/fetch";
import "../../_style/general/Form.css"

export default function FormUpdate({ path, keys, dataUpdate, functions, message, children}) {
    console.log(dataUpdate)
    console.log(keys)
    const SignSquema = Yup.object(
        keys.reduce((schema, field) => {
            if (field === "email") {
                schema[field] = Yup.string().email("Email inválido").required("El email es obligatorio");
            } else if (field === "password") {
                schema[field] = Yup.string()
                    .min(4, "Mínimo 4 caracteres")
                    .max(10, "Máximo 10 caracteres")
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
        const token = localStorage.getItem("token");
        const actualizado = await updateData(`${path}/${dataUpdate._id}`, token, json);
        if (actualizado) {
            if (functions) {
                functions()
            }
            reset();
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

        </form>
    );
}
