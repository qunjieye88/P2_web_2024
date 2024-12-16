/* eslint-disable react/jsx-key */
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import RedirectButton from "./RedirectButton"
import "../../_style/general/Sidebar.css"

export default function Sidebar({isMinimized,setIsMinimized}) {
    const toggleSidebar = () => {
      setIsMinimized(!isMinimized);
    };

    const logOut = () =>{
      localStorage.setItem("token","")
    }
        
  
    return (
      <div  className={`sidebar`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isMinimized ? "☰" : "←"}
        </button>
        <RedirectButton path="/user" functions={()=>{localStorage.setItem("lastPath","/user")}}>Menú</RedirectButton>
        <RedirectButton path="/user/client" functions={()=>{localStorage.setItem("lastPath","/user/client")}}>Cliente</RedirectButton>
        <RedirectButton path="/user/project" functions={()=>{localStorage.setItem("lastPath","/user/project")}}>Proyecto</RedirectButton>
        <RedirectButton path="/user/deliveryNote" functions={()=>{localStorage.setItem("lastPath","/user/deliveryNote")}}>Albarán</RedirectButton>
        <RedirectButton path="/" functions={logOut}>LOG OUT</RedirectButton>
      </div>
    );
};