'use client';

import React from 'react';
import "@/app/_style/general/Message.css"

export default function Massage({ massage, children }) {

    return (
            <div className="popupContent">
                <h1 className='popupContent_info'>{`${massage}`}</h1>
                {children}
            </div>
    );
}

