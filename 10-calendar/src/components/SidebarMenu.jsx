// src/components/SidebarMenu.jsx
import React from 'react';
import './SidebarMenu.css';
import { NavLink } from 'react-router-dom';

export const SidebarMenu = () => {
  return (
    <div className="sidebar-header">
        <h1></h1> 
      <h5>DEPARTAMENTO<br />DE BIOMÉDICA</h5>
      <nav>
        <div className="nav-section"></div>
        <div className="nav-item disabled">
          <i className="fas fa-home"></i> Inicio
        </div>
        <div className="nav-item disabled">
          <i className="fas fa-clipboard-list"></i> Inventario
        </div>
        <NavLink
        to="/mantenimiento"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
        <i className="fas fa-tools"></i> Mantenimiento
        </NavLink>
        <div className="nav-item disabled"> 
          <i className="fas fa-chalkboard-teacher"></i> Capacitación
        </div>
        <div className="nav-item disabled">
          <i className="fas fa-user"></i> Usuario
        </div>
      </nav>
    </div>
  );
};
