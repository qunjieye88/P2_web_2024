'use client';
import React from 'react';
import "@/app/_style/general/OverlayContent.css"

export default function OverlayContent({ children }) {
    return (
        <div className="overlayContent">
                {children}
        </div>
    );
}
