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
        // Verificación más robusta del evento
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        } else {
            console.warn('Evento no válido recibido:', e);
        }

        // Validaciones antes de continuar
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

            // Agregar campos de texto
            formData.append('nombre', productoData.nombre);
            formData.append('precio', productoData.precio);
            formData.append('descripcion', productoData.descripcion);
            formData.append('talla', productoData.talla);
            formData.append('dimensiones', productoData.dimensiones);

            // Agregar portada (un solo archivo)
            if (productoData.portada) {
                formData.append('portada', productoData.portada);
            }

            // Agregar imágenes (múltiples archivos)
            if (productoData.imagenes && productoData.imagenes.length > 0) {
                // Iterar sobre cada archivo y agregarlo individualmente
                Array.from(productoData.imagenes).forEach((file, index) => {
                    formData.append('imagenes', file);
                });
            }

            const token = localStorage.getItem('token');
            
            // Validar que existe el token
            if (!token) {
                alert('No se encontró token de autorización');
                return;
            }

            console.log('Enviando datos al servidor...'); // Para debug

            const response = await fetch(`${VITE_URL}/api/v1/admin/uploads`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // NO agregar Content-Type para FormData, el browser lo maneja automáticamente
                },
                body: formData
            });

            console.log('Respuesta del servidor:', response.status); // Para debug

            // Verificar si la respuesta es OK antes de parsear
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error del servidor:', errorText);
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            
            if (!contentType || !contentType.includes('application/json')) {
                const responseText = await response.text();
                console.error('Respuesta no es JSON:', responseText);
                throw new Error('El servidor devolvió una respuesta inválida');
            }

            const result = await response.json();
            
            // Reset del formulario solo si todo salió bien
            setProductoData({
                nombre: '',
                descripcion: '',
                precio: '',
                talla: '',
                dimensiones: '',
                imagenes: [],
                portada: null
            });

            // Reset de los inputs de archivo
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

        if (name === 'imagenes') {
            // Convertir FileList a Array para mejor manejo
            setProductoData((prev) => ({ 
                ...prev, 
                [name]: Array.from(files) 
            }));
        } else if (name === 'portada') {
            setProductoData((prev) => ({ 
                ...prev, 
                [name]: files[0] || null 
            }));
        }
    };

    return (
        <>
            <main className="Main-admin">
                <h1 className="title">SUBIDA DE ARCHIVOS</h1>

                <form onSubmit={handleSubmit} className="Formu-admin" noValidate>
                    {/* Debug info */}
                    <div style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>
                        Estado: Portada: {productoData.portada ? 'Seleccionada' : 'No seleccionada'} | 
                        Imágenes: {productoData.imagenes.length} archivos
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
                            Seleccionar portada
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
                            Seleccionar imágenes
                            <input
                                onChange={handleFileChange}
                                name="imagenes"
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
                            type="button"
                            onClick={handleSubmit}
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