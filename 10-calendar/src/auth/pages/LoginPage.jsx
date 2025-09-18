import {useEffect} from 'react';
import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail:     '',
    loginPassword: '',
}

const registerFormFields = {
    registerEmail:     '',
    registerName:      '',
    registerUsername:  '',
    registerBirthdate:  '',
    registerRole:      '',
    registerPhoto:     '',
    registerPassword:  '',
   // registerPassword2: '',

}

export const LoginPage = () => {

    const {startLogin, errorMessage, startRegister} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields);
    const {registerEmail, registerName, registerUsername, registerPhoto, registerPassword, registerPassword2, registerBirthdate, registerRole, onInputChange:onRegisterInputChange} = useForm(registerFormFields);

    const loginSubmit = (event)=>{
        event.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    }
    
    const registerSubmit = (event)=>{
        event.preventDefault();
        //Validar contraseña
        if (registerPassword !== registerPassword2){
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return
        }

        //Validar la selección del rol
        if (!registerRole || registerRole.trim() === '') {
            Swal.fire('Error en registro', 'Debe seleccionar un rol', 'error');
            return;
        }

        //Validar fecha de cumpleaños
        if (!registerBirthdate || isNaN(new Date(registerBirthdate).getTime())) {
            Swal.fire('Error en registro', 'Debe ingresar una fecha de cumpleaños válida', 'error');
            return;
        } 

        // Validar username
        if (!registerUsername || registerUsername.trim() === '') {
            Swal.fire('Error en registro', 'Debe ingresar un nombre de usuario', 'error');
            return;
        }

    // Validar foto
    if (!registerPhoto || registerPhoto.trim() === '') {
        Swal.fire('Error en registro', 'Debe subir una foto (url)', 'error');
        return;
    }

        startRegister({email: registerEmail, name:registerName, username: registerUsername, password: registerPassword, password2:registerPassword2, birthdate: registerBirthdate, role: registerRole, photo: registerPhoto, });
        //console.log({registerEmail, registerName, registerPassword, registerPassword2});
    }

    useEffect(() => {
        if(errorMessage != undefined){
            Swal.fire('Error en la autenticación', errorMessage,'error');
        }
    }, [errorMessage]);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-12 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-12 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                <div className="form-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de usuario"
                        name='registerUsername'
                        value={registerUsername}
                        onChange={onRegisterInputChange}
                    />
                </div>


                        <div className="form-group mb-2">
                            <input
                                type="date"
                                className="form-control"
                                id="date-register"
                                placeholder="Cumpleaños"
                                name='registerBirthdate'
                                value={registerBirthdate}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                            <div className="form-group mb-2">
                            <select
                                className="form-control"
                                placeholder="Rol"
                                name='registerRole'
                                value={registerRole}
                                onChange={onRegisterInputChange}
                            >
                                <option value="">Seleccione un rol</option>
                                <option value="admin">Administrador General</option>
                                <option value="ingeniero">Ingeniero</option>
                                <option value="usuario">Usuario</option>
                            </select>
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="URL de foto"
                                name='registerPhoto'
                                value={registerPhoto}
                                onChange={onRegisterInputChange}
                            />
                        </div>


                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}