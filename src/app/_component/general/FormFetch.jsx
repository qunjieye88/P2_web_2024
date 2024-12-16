'use client'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import "../../_style/general/Form.css"
import { createJson, fetchUtil } from "@/app/_utils/fetch";
import { useRouter } from "next/navigation";



export default function Formulario({ path, keys, method, functions, message, clientId, projectId, children }) {

    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();
    const SignSquema = Yup.object(
        keys.reduce((row, field) => {
            if (field === "email") {
                row[field] = Yup.string().email("Email inválido").required("El email es obligatorio");
            } else if (field === "password") {
                row[field] = Yup.string()
                    .min(4, "Mínimo 8 caracteres")
                    .required("La contraseña es obligatoria");
            } else if (field === "image") {
                row[field] = Yup.mixed().required("La imagen es obligatoria");
            } else {
                row[field] = Yup.string().required(`El campo ${field} es obligatorio`);
            }
            return row;
        }, {})
    );
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema),
    });

    function onSubmit(data) {
        functionFetch(data, keys);
        reset();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    async function functionFetch(data, keys) {

        if (keys[0] === "image") {
            const formData = new FormData();
            formData.append("image", data.image[0])
            const result = await fetchUtil(path, method, formData)

            if (result instanceof Error) {
                setError("Error al enviar");
            } else {
                functions && functions()
                setError("");
            }
        } else {
            if (projectId) {
                data["clientId"] = clientId
                data["projectId"] = projectId
                keys.push("clientId")
                keys.push("projectId")
            } else if (clientId) {
                data["clientId"] = clientId
                keys.push("clientId")
            }
            const json = createJson(data, keys)
            const result = await fetchUtil(path, method, json)
            if (result instanceof Error) {
                if (result.message.includes("422")) {
                    setError("Datos incorrectos");
                } else if (result.message.includes("409")) {
                    setError("Ya existe cuenta");
                } else {
                    setError("Datos incorrectos");
                }
            } else {
                functions && functions()
                setError("");
            }
            if (result["token"]) {
                localStorage.setItem("token", result["token"]);
                router.push("/register/entercodeverification");
            } else if (result["acknowledged"]) {
                router.push("/");
            }
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{message}</h1>
            {
                keys.map((row, index) => (
                    <div key={index} className="input_container">
                        {row === "password" ? (
                            <>
                                <input {...register(row)} type="password" placeholder={`Ingresa tu ${row}`} />
                                {errors[row] && <p className="error-message">{errors[row].message}</p>}
                            </>
                        ) :row === "image" ? (
                            <>
                                <input {...register(row)}  onChange={handleImageChange}  type="file" accept="image/*" />
                                {errors[row] && <p className="error-message">{errors[row].message}</p>}
                                {imagePreview && (
                                    <div className="image-preview-container">
                                        <h3>Vista Previa:</h3>
                                        <img src={imagePreview} alt="Vista previa" style={{ maxWidth: "300px", margin: "10px 0" }} />
                                    </div>
                                )}

                            </>
                        ) : row === "street" ? (
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
