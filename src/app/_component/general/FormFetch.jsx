'use client'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import "../../_style/general/Form.css"
import { createJson, fetchUtil } from "@/app/_utils/fetch";
import { useRouter } from "next/navigation";




export default function Formulario({ path, keys,method, functions, message, clientId, projectId, children}) {

    const router = useRouter();
    const SignSquema = Yup.object(
        keys.reduce((row, field) => {
            if (field === "email") {
                row[field] = Yup.string().email("Email inválido").required("El email es obligatorio");
            } else if (field === "password") {
                row[field] = Yup.string()
                    .min(4, "Mínimo 4 caracteres")
                    .max(10, "Máximo 10 caracteres")
                    .required("La contraseña es obligatoria");
            } else {
                row[field] = Yup.string().required(`El campo ${field} es obligatorio`);
            }
            return row;
        }, {})
    );

    const [error, setError] = useState("");
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema),
    });

    function onSubmit(data) {
        functionFetch(data, keys);
        reset();
    }

    async function functionFetch(data, keys) {
        if(projectId){
            data["clientId"] = clientId
            data["projectId"] = projectId
            clientId && keys.push("clientId")
            clientId && keys.push("projectId")
        }else if(clientId){
            data["clientId"] = clientId
            clientId && keys.push("clientId")
        }
        const json = createJson(data, keys)
        const result = await fetchUtil(path,method, json)
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
        console.log(result)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{message}</h1>{
                keys.map((row) => (
                    <div key={row} className="input_container">
                        {row !== "street" ? (
                            <>
                                <input {...register(row)} placeholder={`Ingresa tu ${row}`} />
                                {errors[row] && <p className="error-message">{errors[row].message}</p>}
                            </>
                        ) : (
                            <>
                                <input {...register(row)} placeholder={`Ingresa tu ${row}`} />
                                {errors[row] && <p className="error-message">{errors[row].message}</p>}
                            </>
                        )}
                    </div>
                ))
            }
            <div className="buttonContainer">
                {children}
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}
