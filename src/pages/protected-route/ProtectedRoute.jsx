import { Navigate,Outlet } from "react-router";


const ProtectedRoute = ({ requiredRole }) => {



    //1. Obtener token 
    const userRole = localStorage.getItem('userRole');

    try {
        //2. Verificamos si existe el token

        if (!userRole) {
            console.log("No hay rol, redirigiendo a login")

            return <Navigate to='/login' replace />

        }


        //3. Verficamos si se requiere un role especifico 

        if (requiredRole && userRole !== requiredRole) {

            console.log(`Rol requerido: ${requiredRole}, Rol del usuario: ${userRole}. Acceso denegado.`);
            return <Navigate to="/acceso-denegado" replace />

        }

        console.log('Acceso permitido, mostrando contenido')

        return <Outlet />

    } catch (e) {
        console.error('Error al decodificar el token', e);
        localStorage.removeItem('token')
        return <Navigate to='/login' replace />

    }









}

export default ProtectedRoute;