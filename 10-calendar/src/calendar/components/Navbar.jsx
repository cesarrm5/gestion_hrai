import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
  const { startLogout } = useAuthStore();
  const location = useLocation();

  // Detecta la ruta y devuelve título + icono
  const getCurrentSection = () => {
    if (location.pathname.startsWith('/mantenimiento')) {
      return { title: 'Mantenimiento', icon: 'fas fa-tools' };
    }
    if (location.pathname.startsWith('/inventario')) {
      return { title: 'Inventario', icon: 'fas fa-clipboard-list' };
    }
    if (location.pathname.startsWith('/capacitacion')) {
      return { title: 'Capacitación', icon: 'fas fa-chalkboard-teacher' };
    }
    if (location.pathname.startsWith('/usuario')) {
      return { title: 'Usuario', icon: 'fas fa-user' };
    }
    return { title: 'Inicio', icon: 'fas fa-home' };
  };

  const { title, icon } = getCurrentSection();

  return (
    <div
      className="navbar navbar-dark bg-dark mb-4 px-4 w-100"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999
      }}
    >
      <span className="navbar-brand">
        <i className={icon}></i>
        &nbsp;
        {title}
      </span>

      <button
        className="btn btn-outline-danger"
        onClick={startLogout}
      >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};

