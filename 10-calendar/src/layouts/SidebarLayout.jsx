// src/layouts/SidebarLayout.jsx
import React from 'react';
import { SidebarMenu } from '../components/SidebarMenu';

export const SidebarLayout = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Columna izquierda (sidebar) */}
      <div style={{ width: 220, flexShrink: 0 }}>
        <SidebarMenu />
      </div>

      {/* Columna derecha (contenido) */}
      <div
        style={{
          flex: 1,
          minWidth: 0,     // importante para que se estire correctamente
        }}
      >
        {children}
      </div>
    </div>
  );
};
