import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { useAuthStore } from '../hooks';

import { MantenimientoPage } from '../mantenimiento/pages/MantenimientoPage';
import { InicioPage } from '../inicio/pages/InicioPage';
import { InventarioPage } from '../inventario/pages/InventarioPage';
import { CapacitacionPage } from '../capacitacion/pages/CapacitacionPage';
import { UsuarioPage } from '../usuario/pages/UsuarioPage';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => { checkAuthToken(); }, []);

  if (status === 'checking') return <h3>Cargando...</h3>;

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          {/* raíz -> mantenimiento */}
          <Route path="/" element={<Navigate to="/mantenimiento" replace />} />

          {/* secciones */}
          <Route path="/inicio"        element={<InicioPage />} />
          <Route path="/inventario"    element={<InventarioPage />} />
          <Route path="/mantenimiento" element={<MantenimientoPage />} />
          <Route path="/capacitacion"  element={<CapacitacionPage />} />
          <Route path="/usuario"       element={<UsuarioPage />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/mantenimiento" replace />} />
        </>
      )}
    </Routes>
  );
};
