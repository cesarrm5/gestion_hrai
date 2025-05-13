import { useDispatch, useSelector } from "react-redux"
import {calendarApi } from "../api"
import { onChecking, onLogin, onLogout, clearErrorMessage} from "../store/auth/authSlice";


export const useAuthStore =()=>{

    const { status, user, errorMessage} = useSelector (state => state.auth);
    const dispatch = useDispatch();

    const startLogin  =  async({email, password}) =>{
        dispatch(onChecking());
        try {
           
            const {data} = await calendarApi.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
                       
        } catch (error) {
           dispatch(onLogout('Credenciales Incorrectas'));
           setTimeout(() => {
                dispatch (clearErrorMessage());
           }, 10);
        }
    }

    const startRegister = async({email, name, password, password2})=>{
        try {
            let username = "Cesar";
            let birthdate = "25 enero 2002";
            const {data} = await calendarApi.post('/new', {name, username, password, birthdate});
            localStorage.setItem('uid', data.uid);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
                       
        } catch (error) {
           dispatch(onLogout('Credenciales Incorrectas'));
           setTimeout(() => {
                dispatch (clearErrorMessage());
           }, 10);
        }
    }
    return {
        //*propiedades
        status, 
        user, 
        errorMessage,
        startLogin,
        startRegister

        //* Metodosd
    }
}