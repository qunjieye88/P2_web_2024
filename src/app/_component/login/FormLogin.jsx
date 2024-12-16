'use client'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import "../../_style/general/Form.css"
import RedirectButton from ".././general/RedirectButton"
import { createJson } from "@/app/_utils/fetch";

export default function Formulario({ keys, path, method, headers }) {

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

    const [error, setError] = useState("");
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema),
    });

    function onSubmit(data) {
        functionFetch(data,keys,headers);
        reset();
    }

    function functionFetch(data,keys) {
        const json = createJson(data, keys)
        fetch(path, {
            method: method,
            headers: headers,
            body: JSON.stringify(json),
        })
            .then((respuesta) => {
                if (respuesta.ok) {
                    return respuesta.json();
                } else {
                    throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
                }
            })
            .then((dato) => {
                localStorage.setItem("token", dato["token"]);
                if (dato["token"]) {
                    router.push("/user");
                }
                setError("");
            })
            .catch((error) => {
                if (error.message.includes("422")) {
                    setError("Datos incorrectos");
                }
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Inicia Sesión</h1>{
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
            <RedirectButton path={"/register"}>crear cuenta</RedirectButton>
                <button type="submit" >Aceptar</button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}
