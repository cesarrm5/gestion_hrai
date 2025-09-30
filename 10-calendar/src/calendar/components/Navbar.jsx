import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = ({ offsetLeft = 220, forcedTitle, forcedIcon }) => {
  const { startLogout } = useAuthStore();
  const location = useLocation();

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

  const detected = getCurrentSection();
  const title = forcedTitle ?? detected.title;
  const icon  = forcedIcon  ?? detected.icon;

  return (
    <div
      className="navbar navbar-dark bg-dark px-4"
      style={{
        position: 'fixed',
        top: 0,
        left: offsetLeft,                      // arranca a la derecha del sidebar
        width: `calc(100vw - ${offsetLeft}px)`,// ¡clave! sin w-100 y sin right:0
        height: 56,
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      <span className="navbar-brand m-0">
        <i className={icon}></i>&nbsp;{title}
      </span>

      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={startLogout}
      >
        <i className="fas fa-sign-out-alt"></i>&nbsp;<span>Salir</span>
      </button>
    </div>
  );
};
