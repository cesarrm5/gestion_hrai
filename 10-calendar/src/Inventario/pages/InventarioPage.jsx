// src/inventario/pages/InventarioPage.jsx
import { useMemo, useState } from 'react';
import { SidebarLayout } from '../../layouts/SidebarLayout';
import { Navbar } from '../../calendar';
import { InventoryTable } from '../components/InventoryTable';
import '../styles/inventario.css';

// Muestra de datos como ejemplo
const SAMPLE = [
  {
    id: 'ASCE-0156',
    nombre: 'MAQUINA DE ANESTESIA',
    marca: 'DRÄGER',
    modelo: 'FABIUS PLUS',
    serie: 'ASCE-0156',
    area: 'CIRUGÍA PROGRAMADA',
    ubicacion: 'CIRUGÍA PROGRAMADA',
  },
  { id: '18439359', nombre: 'BOMBAS VOLUMÉTRICAS DE INFUSIÓN', marca: 'PULM A+', modelo: 'PULM A+', serie: '18439359', area: 'HOSPITALIZACIÓN', ubicacion: 'HOSPITALIZACIÓN' },
  { id: '1120132', nombre: 'LAVADORA DESINFECTADORA', marca: 'STEELO', modelo: 'DS 1000/DS 500', serie: '1120132', area: 'CEYE', ubicacion: 'CEYE' },
  { id: '804ASCE-0065', nombre: 'CUNA DE CALOR RADIANTE', marca: 'DRÄGER', modelo: 'BABYTHE RM', serie: '804ASCE-0065', area: 'TIN', ubicacion: 'TIN' },
  { id: '550055693', nombre: 'ELECTROCARDIÓGRAFO', marca: 'GE', modelo: 'MAC-1200ST', serie: '550055693', area: 'TIA', ubicacion: 'TIA' },
  { id: '2812425', nombre: 'GASTROSCOPIO', marca: 'OLYMPUS', modelo: '2TH190', serie: '2812425', area: 'ENDOSCOPÍA', ubicacion: 'ENDOSCOPÍA' },
  { id: 'AMX7001025', nombre: 'RAYOS X PORTÁTIL', marca: 'GE', modelo: 'DEFINIUM AMX700', serie: 'AMX7001025', area: 'TIA', ubicacion: 'TIA' },
  { id: '101110073708', nombre: 'ESFIGMÓMANO ANEROIDE DE PARED', marca: 'WELCH ALLYN', modelo: '7670-01/7670-30', serie: '101110073708', area: 'ADMISIÓN CONTINUA', ubicacion: 'ADMISIÓN CONTINUA' },
];

export const InventarioPage = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // filtro simple por varias columnas
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE;
    return SAMPLE.filter(r =>
      [r.id, r.nombre, r.marca, r.modelo, r.serie, r.area, r.ubicacion]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const goto = (p) => setPage(Math.min(totalPages, Math.max(1, p)));

  return (
    <SidebarLayout>
      <Navbar />

      {/* CONTENIDO */}
      <div className="inv-wrapper">
        {/* Topbar */}
        <div className="inv-topbar">
          <div className="inv-tabs">
            <button className="inv-tab inv-tab--active">Ficha técnica</button>
            <button className="inv-tab" disabled>Movimientos</button>
            <button className="inv-tab" disabled>Responsables</button>
          </div>

          <div className="inv-search">
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder="Busca un equipo en especial"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {/* Tarjeta + tabla */}
        <div className="inv-card">
          <InventoryTable rows={paginated} />
        </div>

        {/* Acciones (izquierda) + paginación (derecha) */}
        <div className="inv-footer">
          {/* Acciones a la izquierda */}
          <div className="inv-actions">
            <button className="btn-pill btn-primary">Agregar</button>
            <button className="btn-pill btn-outline">Entrada</button>
            <button className="btn-pill btn-outline">Salida</button>
          </div>

          {/* Paginación a la derecha */}
          <div className="inv-pagination">
            <button onClick={() => goto(page - 1)} disabled={page === 1}>
              <i className="fas fa-angle-left" /> Anterior
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  className={`inv-page ${n === page ? 'is-active' : ''}`}
                  onClick={() => goto(n)}
                >
                  {n}
                </button>
              );
            })}

            <button onClick={() => goto(page + 1)} disabled={page === totalPages}>
              Siguiente <i className="fas fa-angle-right" />
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};
