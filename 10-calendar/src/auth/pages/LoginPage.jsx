// src/auth/pages/LoginPage.jsx
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../../hooks';
import './LoginPage.css';

const loginFormFields = { loginEmail: '', loginPassword: '' };

const registerFormFields = {
  registerEmail: '',
  registerName: '',
  registerUsername: '',
  registerBirthdate: '',
  registerRole: '',
  registerPhoto: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerEmail,
    registerName,
    registerUsername,
    registerPhoto,
    registerPassword,
    registerPassword2,
    registerBirthdate,
    registerRole,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
      return;
    }
    if (!registerRole?.trim()) {
      Swal.fire('Error en registro', 'Debe seleccionar un rol', 'error');
      return;
    }
    if (!registerBirthdate || isNaN(new Date(registerBirthdate).getTime())) {
      Swal.fire(
        'Error en registro',
        'Debe ingresar una fecha de cumpleaños válida',
        'error'
      );
      return;
    }
    if (!registerUsername?.trim()) {
      Swal.fire(
        'Error en registro',
        'Debe ingresar un nombre de usuario',
        'error'
      );
      return;
    }
    if (!registerPhoto?.trim()) {
      Swal.fire('Error en registro', 'Debe subir una foto (url)', 'error');
      return;
    }

    startRegister({
      email: registerEmail,
      name: registerName,
      username: registerUsername,
      password: registerPassword,
      password2: registerPassword2,
      birthdate: registerBirthdate,
      role: registerRole,
      photo: registerPhoto,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className="auth-shell">
      {/* Columna izquierda: tarjetas */}
      <div className="auth-grid">
        {/* Ingreso */}
        <section className="login-card login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit} className="login-form">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              name="loginEmail"
              autoComplete="email"
              value={loginEmail}
              onChange={onLoginInputChange}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="loginPassword"
              autoComplete="current-password"
              value={loginPassword}
              onChange={onLoginInputChange}
            />
            <button type="submit" className="btnSubmit btnSubmit--primary">
              Login
            </button>
          </form>
        </section>

        {/* Registro */}
        <section className="login-card login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit} className="login-form">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="registerName"
              value={registerName}
              onChange={onRegisterInputChange}
            />

            <input
              type="text"
              className="form-control"
              placeholder="Nombre de usuario"
              name="registerUsername"
              value={registerUsername}
              onChange={onRegisterInputChange}
            />

            <input
              type="date"
              className="form-control"
              id="date-register"
              placeholder="Cumpleaños"
              name="registerBirthdate"
              value={registerBirthdate}
              onChange={onRegisterInputChange}
            />

            <select
              className="form-control"
              name="registerRole"
              value={registerRole}
              onChange={onRegisterInputChange}
            >
              <option value="">Seleccione un rol</option>
              <option value="admin">Administrador General</option>
              <option value="ingeniero">Ingeniero</option>
              <option value="usuario">Usuario</option>
            </select>

            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              name="registerEmail"
              autoComplete="email"
              value={registerEmail}
              onChange={onRegisterInputChange}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="registerPassword"
              autoComplete="new-password"
              value={registerPassword}
              onChange={onRegisterInputChange}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Repita la contraseña"
              name="registerPassword2"
              autoComplete="new-password"
              value={registerPassword2}
              onChange={onRegisterInputChange}
            />

            <input
              type="text"
              className="form-control"
              placeholder="URL de foto"
              name="registerPhoto"
              value={registerPhoto}
              onChange={onRegisterInputChange}
            />

            <button type="submit" className="btnSubmit btnSubmit--light">
              Crear cuenta
            </button>
          </form>
        </section>
      </div>

      {/* Columna derecha: panel con imagen (oculto en móvil por CSS) */}
      <aside
        className="auth-art"
        style={{ backgroundImage: 'url(/assets/Fondo2.jpeg)' }}
      />
    </div>
  );
};
