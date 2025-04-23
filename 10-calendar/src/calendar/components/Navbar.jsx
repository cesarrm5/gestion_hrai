

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4 w-100" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            HRAEI
        </span>

        <button className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
        </button>
    </div>
  )
}
