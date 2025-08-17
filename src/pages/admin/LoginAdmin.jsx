
import { useState } from 'react';
import './adminform.css'
import { NavLink } from 'react-router';
import { useNavigate } from 'react-router';




const LoginAdmin = () => {


    const VITE_URL_LOCAL = import.meta.env.VITE_URL_LOCAL
    
    const navigate = useNavigate();

    const [data,setData] = useState({


        usuario:"",
        password:""


    })



    const handleChange = async (e) => {

        const {name, value} = e.target;
        setData((prev) => ({...prev, [name]: value}))
    }



    const handleLogin = async (e) => {
        e.preventDefault();

        if(!data.usuario || !data.password) {
            return;
        }




        try {

            const response = await fetch(`${VITE_URL_LOCAL}/api/v1/admin/login`, {

                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    usuario:data.usuario,
                    password:data.password
                })
            })



            const datos = await response.json();


            if(response.ok) {

                localStorage.setItem('token', datos.token)
                localStorage.setItem('userRole', datos.user.role)

                LogIn({
                   
                    usuario:datos.user.usuario || '',
                    role:datos.user.role,
                    _id:datos.user.id
                })
             
            
                if(datos.user.role === 'admin') {
                    navigate('/admin/uploads')

                } else {
                    navigate('/')
                }

            } else {

                alert("Algo no funciona")
               
            }




        } catch (e) {

            console.error(e)



        }




    }





    return (

        <>


            <main className="Main-admin">
                <form onSubmit={handleLogin} className="Formu-admin">
                    <h1 className="title">LOG IN</h1>


                    <input type="text"  name='usuario' onChange={handleChange} value={data.usuario} className="Formu-input" placeholder='Usuario'/>
                    <input type="password" name='password' onChange={handleChange} value={data.password}className="Formu-input" placeholder='Contraseña'/>


                  <button type='submit'  className="Button-admin">Entrar</button>


                </form>


            </main>



        </>
    );
}

export default LoginAdmin;