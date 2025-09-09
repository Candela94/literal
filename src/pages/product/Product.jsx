import './product.css';
import { HeaderSmall } from '../../components/header/Header';
import { useState, useEffect, useRef } from 'react';
import { useFetchProduct } from '../../hooks/usefetch';
import { useParams } from 'react-router';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/button/Button';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const Product = () => {
    const { pid } = useParams();
    const { addToCart } = useCart()
    const { producto, loading, error, obtenerProducto } = useFetchProduct();
    const parallaxRef = useRef();

    useEffect(() => {
        if (pid) {
            obtenerProducto(pid);
        }
    }, [pid]);

    return (
        <>
            <HeaderSmall />
            <main className="Main-product">
                <section className="Galeria-imagenes">
                    {
                        producto?.imagenes && (
                            <div className="galeria-contenedor">
                                {producto.imagenes.map((img, id) => (
                                    <div key={id} className="imagen-galeria">
                                        <img src={img} alt={`Imagen ${id + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </section>

                <section className="info-producto">
                    {producto && (

                        <div className="info-descripcion">


                            <div className="info-texto">
                                <div className="producto-nombre-precio">
                                    <h3 className="producto-nombre">{producto.nombre}</h3>
                                    <h3 className="producto-precio"> {producto.precio}€</h3>
                                </div>

                                <p className="producto-descripcion">{producto.descripcion}</p>
                            </div>

                            
                            <div className="btn-cart">
                                <Button variant='action' onClick={() => addToCart(producto)}>AÑADIR AL CARRITO</Button>
                            </div>
                        </div>

                    )}
                </section>
            </main>
        </>
    );
};

export default Product;