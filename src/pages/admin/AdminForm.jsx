import { useEffect, useState } from 'react';
import './adminform.css'
import { useNavigate } from 'react-router';

const AdminForm = () => {
    const VITE_URL = import.meta.env.VITE_URL

    const [productoData, setProductoData] = useState({
        imagenes: [],
        portada: null,
        nombre: '',
        descripcion: '',
        precio: '',
        talla: '',
        dimensiones: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault(); // Simplificado - siempre debería ser un evento válido

        // Validaciones
        if (!productoData.nombre || !productoData.precio || !productoData.descripcion) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        if (!productoData.portada) {
            alert('Por favor selecciona una imagen de portada');
            return;
        }

        try {
            const formData = new FormData();

            // Añadir campos de texto
            formData.append('nombre', productoData.nombre);
            formData.append('precio', productoData.precio);
            formData.append('descripcion', productoData.descripcion);
            formData.append('talla', productoData.talla || '');
            formData.append('dimensiones', productoData.dimensiones || '');

            // Añadir portada
            if (productoData.portada) {
                formData.append('portada', productoData.portada);
            }

            // Añadir imágenes adicionales
            if (productoData.imagenes && productoData.imagenes.length > 0) {
                productoData.imagenes.forEach((file) => {
                    formData.append('imgprod', file);
                });
            }

            // Debug: Ver qué se está enviando
            console.log('Datos a enviar:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const token = localStorage.getItem('token');

            if (!token) {
                alert('No se encontró token de autorización');
                return;
            }

            console.log('Enviando datos al servidor...');

            const response = await fetch(`${VITE_URL}/api/v1/admin/uploads`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            console.log('Respuesta del servidor:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error del servidor:', errorText);
                throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
            }

            const contentType = response.headers.get('content-type');
            
            if (!contentType || !contentType.includes('application/json')) {
                const responseText = await response.text();
                console.error('Respuesta no es JSON:', responseText);
                throw new Error('El servidor devolvió una respuesta inválida');
            }

            const result = await response.json();
            console.log('Resultado:', result);
            
            // Limpiar formulario después del éxito
            setProductoData({
                nombre: '',
                descripcion: '',
                precio: '',
                talla: '',
                dimensiones: '',
                imagenes: [],
                portada: null
            });

            // Limpiar inputs de archivo
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => input.value = '');

            alert('Producto subido con éxito');

        } catch (error) {
            console.error('Error completo:', error);
            alert(`Error al subir el producto: ${error.message}`);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoData((prev) => ({ ...prev, [name]: value }));
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;

        console.log(`Cambio en ${name}:`, files); // Debug

        if (name === 'imgprod') {
            // Validar máximo 10 archivos como en el backend
            if (files.length > 10) {
                alert('Máximo 10 imágenes adicionales permitidas');
                e.target.value = ''; // Limpiar input
                return;
            }
            setProductoData((prev) => ({ 
                ...prev, 
                imagenes: Array.from(files)
            }));
        } else if (name === 'portada') {
            setProductoData((prev) => ({ 
                ...prev, 
                portada: files[0] || null 
            }));
        }
    };

    return (
        <>
            <main className="Main-admin">
                <h1 className="title">SUBIDA DE ARCHIVOS</h1>

                <form onSubmit={handleSubmit} className="Formu-admin" noValidate>
                    {/* Información de debug */}
                    <div style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>
                        Portada: {productoData.portada ? productoData.portada.name : 'No seleccionada'}
                        <br />
                        Imágenes: {productoData.imagenes.length} archivos seleccionados
                    </div>

                    <input 
                        type="text" 
                        className="Formu-input" 
                        name='nombre' 
                        placeholder='Nombre del producto'  
                        onChange={handleChange} 
                        value={productoData.nombre}
                        required
                    />
                    <input 
                        type="number" 
                        className="Formu-input" 
                        name='precio' 
                        placeholder='Precio'  
                        onChange={handleChange} 
                        value={productoData.precio}
                        required
                    />
                    <input 
                        type="text" 
                        className="Formu-input" 
                        name='descripcion' 
                        placeholder='Descripción'  
                        onChange={handleChange} 
                        value={productoData.descripcion}
                        required
                    />
                    <input 
                        type="text" 
                        className="Formu-input" 
                        name='talla' 
                        placeholder='Talla'  
                        onChange={handleChange} 
                        value={productoData.talla}
                    />
                    <input 
                        type="text" 
                        className="Formu-input" 
                        name='dimensiones' 
                        placeholder='Dimensiones' 
                        onChange={handleChange} 
                        value={productoData.dimensiones} 
                    />

                    <div className="Formulario-uploads">
                        <label className="Formulario-label" htmlFor="Portada-upload">
                            Seleccionar portada *
                            <input
                                onChange={handleFileChange}
                                name="portada"
                                className="Formulario-input"
                                id="Portada-upload"
                                type="file"
                                accept="image/*"
                                required
                            />
                        </label>

                        <label className="Formulario-label" htmlFor="Img-upload">
                            Seleccionar imágenes adicionales
                            <input
                                onChange={handleFileChange}
                                name="imgprod"
                                className="Formulario-input hidden-input"
                                id="Img-upload"
                                type="file"
                                multiple
                                accept="image/*"
                            />
                        </label>
                    </div>

                    <div className="Boton">
                        <button 
                            type="submit"
                            className="Button-admin" 
                            style={{marginTop:'2rem', width:'70%'}}
                        >
                            Subir producto
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default AdminForm;