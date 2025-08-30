import './product.css';
import { Header } from '../../components/header/Header';
import { useState, useEffect } from 'react';
import { useFetchProduct } from '../../hooks/usefetch';
import { useParams } from 'react-router';

const Product = () => {
    const { pid } = useParams();
    const { producto, loading, error, obtenerProducto } = useFetchProduct();

    useEffect(() => {
        if (pid) {
            obtenerProducto(pid);
        }
    }, [pid]);

    // Establecer variable CSS para el número de imágenes
    useEffect(() => {
        if (producto && producto.imagenes) {
            document.documentElement.style.setProperty('--num-imagenes', producto.imagenes.length);
        }
    }, [producto]);

    console.log(producto);

    if (loading) {
        return (
            <>
                <Header />
                <main className="Main-product">
                    <div>Cargando producto...</div>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <main className="Main-product">
                    <div>Error al cargar el producto</div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="Main-product">
                <div className="Galeria">
                    <div className="contenedor-scroll">
                        {producto && Array.isArray(producto.imagenes) && producto.imagenes.map((url, index) => (
                            <div className="seccion" key={index}>
                                <img 
                                    src={url} 
                                    alt={`Imagen ${index + 1} del producto`} 
                                    className="img"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>


               
            </main>
        </>
    );
};

export default Product;