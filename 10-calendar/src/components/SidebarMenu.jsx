// src/components/SidebarMenu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarMenu.css';

export const SidebarMenu = () => {
  const navClass = ({ isActive }) => `nav-item${isActive ? ' active' : ''}`;

  return (
    <aside className="sidebar-header">
      {/* Encabezado del menú */}
      <h1 className="sr-only">Menú lateral</h1>
      <h5>
        DEPARTAMENTO
        <br />
        DE BIOMÉDICA
      </h5>

      <nav>
        <div className="nav-section"></div>

        <NavLink to="/inicio" className={navClass} end>
          <i className="fas fa-home"></i> <span>Inicio</span>
        </NavLink>

        <NavLink to="/inventario" className={navClass} end>
          <i className="fas fa-clipboard-list"></i> <span>Inventario</span>
        </NavLink>

        <NavLink to="/mantenimiento" className={navClass} end>
          <i className="fas fa-tools"></i> <span>Mantenimiento</span>
        </NavLink>

        {/* URL sin acento en la ruta, el texto sí mantiene el acento */}
        <NavLink to="/capacitacion" className={navClass} end>
          <i className="fas fa-chalkboard-teacher"></i> <span>Capacitación</span>
        </NavLink>

        <NavLink to="/usuario" className={navClass} end>
          <i className="fas fa-user"></i> <span>Usuario</span>
        </NavLink>
      </nav>
    </aside>
  );
};
