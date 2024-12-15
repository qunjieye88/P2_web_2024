/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import { useState } from "react";
import Sidebar from "../_component/general/Sidebar";
import "@/app/_style/user/pageUser.css"

export default function layoutUsuario({ children }) {
    
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <div className="user">
            <div className={`container-Sidebar  ${isMinimized ? "minimized" : ""}`}>
                <Sidebar isMinimized={isMinimized} setIsMinimized={setIsMinimized}></Sidebar>
            </div>

            <div className={`container-children  ${isMinimized ? "minimized" : ""}`}>
                {children}
            </div>
        </div>
    );
}
