import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { MantenimientoPage } from '../mantenimiento/pages/MantenimientoPage';



export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    //const authStatus = 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, [])
    

    if ( status === 'checking' ) {
        return(
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {

                ( status === 'not-authenticated')
                    ? ( 
                        <>
                            <Route path="/auth/*" element={ <LoginPage />} />
                            <Route path="/*" element={ <Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <CalendarPage />} />
                            <Route path="/mantenimiento" element={<MantenimientoPage />} /> 
                            <Route path="/*" element={ <Navigate to="/" />} />
                        </>
                    )

            }
            
            
        </Routes>
    )
}
