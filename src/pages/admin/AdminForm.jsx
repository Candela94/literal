

import { useEffect, useState } from 'react';
import './adminform.css'
import { useNavigate } from 'react-router';



const AdminForm = () => {

    const VITE_URL = import.meta.env.VITE_URL

    const [productoData, setProductoData] = useState({


        imagenes: null,
        portada: null,

        nombre: '',
        descripcion: '',
        precio: '',
        talla: '',
        dimensiones: ''


    })


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {



            const formData = new FormData();

            formData.append('nombre', productoData.nombre)

            formData.append('precio', productoData.precio)


            formData.append('descripcion', productoData.descripcion)

            formData.append('talla', productoData.talla)

            formData.append('dimensiones', productoData.dimensiones)

            formData.append('imagenes', productoData.imagenes)

            formData.append('portada', productoData.portada)



            const token = localStorage.getItem('token');

            const response = await fetch(`${VITE_URL}/api/v1/admin/uploads`, {

                method: 'POST',
                headers: {

                    'Authorization': `Bearer ${token}`
                },

                body: formData
            })


            const contentType = response.headers.get('content-type');

            if (!contentType || !contentType.includes('application/json')) {
                console.error('Respuesta no es JSON:', await response.text());
                throw new Error('El servidor devolvió una respuesta inválida');
            }


            const result = await response.json();
            if (response.ok) {
                setProductoData({
                    nombre: '',
                    descripcion: '',
                    precio: '',
                    talla: '',
                    dimensiones: '',
                    imagenes: null,
                    portada: null
                });

                alert('Producto subido con éxito')
            } else {
                alert('Error al subir el producto')
            }




        } catch (e) {


        }
    }




    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoData((prev) => ({ ...prev, [name]: value }))
    }




    const handleFileChange = (e) => {
        const { name, files } = e.target;


        // Si es el campo de imágenes (múltiples), guardar todo el array
        if (name === 'imagenes') {



            setProductoData((prev) => ({ ...prev, [name]: files }));


        } else {


            setProductoData((prev) => ({ ...prev, [name]: files[0] }));


        }
    };






    return (


        <>


            <main className="Main-admin">
                <h1 className="title">SUBIDA DE ARCHIVOS</h1>

                <form onSubmit={handleSubmit} className="Formu-admin">


                    <input type="text" className="Formu-input" name='nombre' placeholder='Nombre del producto' />
                    <input type="text" className="Formu-input" name='precio' placeholder='Precio' />
                    <input type="text" className="Formu-input" name='descripcion' placeholder='Descripción' />
                    <input type="text" className="Formu-input" name='talla' placeholder='Talla' />
                    <input type="text" className="Formu-input" name='dimensiones' placeholder='Dimensiones' />



                    <div className="Formulario-uploads">


                    <label className="Formulario-label" htmlFor="Portada-upload">
                            Seleccionar portada
                            <input
                                onChange={handleFileChange}
                                name="portada"
                                className="Formulario-input"
                                id="Portada-upload"
                                type="file"
                                
                            />
                        </label>

                        <label className="Formulario-label" htmlFor="Img-upload">
                            Seleccionar imágenes
                            <input
                                onChange={handleFileChange}
                                name="imagenes"
                                className="Formulario-input hidden-input"
                                id="Img-upload"
                                type="file"
                                multiple
                                
                            />
                        </label>

                       
                    </div>

                    <div className="Boton">

                    <button type='submit'  className="Button-admin" style={{marginTop:'2rem', width:'70%'}}>Subir producto</button>
                    </div>




                </form>



            </main>


        </>




    );





}

export default AdminForm;