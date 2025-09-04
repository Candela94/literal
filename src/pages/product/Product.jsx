import './product.css';
import { HeaderSmall } from '../../components/header/Header';
import { useState, useEffect, useRef } from 'react';
import { useFetchProduct } from '../../hooks/usefetch';
import { useParams } from 'react-router';

import { useCart } from '../../context/CartContext';
import { Button } from '../../components/button/Button';

const Product = () => {



    const { pid } = useParams();

    const {addToCart} = useCart()

    const { producto, loading, error, obtenerProducto } = useFetchProduct();


    const scrollContainerRef = useRef(null);

    const [scrollY, setScrollY] = useState(0);






    useEffect(() => {


        if (pid) {
            obtenerProducto(pid);
        }


    }, [pid]);






    useEffect(() => {



        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);







    return (
        <>
            <HeaderSmall />

            <main className="Main-product">


                <section className="producto-imagenes">

                    <div className="bloque-scroll-imagenes">
                        <div className="scroll-transition-container" ref={scrollContainerRef}>

                            {producto?.imagenes?.map((url, index) => {


                                const sectionHeight = window.innerHeight * 0.3;
                                const start = index * sectionHeight;
                                const end = (index + 1) * sectionHeight;

                                const progress = Math.min(Math.max((scrollY - start) / sectionHeight, 0), 1);
                                const isActive = scrollY >= start && scrollY <= end;
                                const totalScrollHeight = (producto?.imagenes?.length + 1) * sectionHeight;


                                let translateY = 0;



                                // Solo aplicar movimiento a las imágenes después de la primera

                                if (index !== 0) {
                                    translateY = (1 - progress) * 80;
                                    if (scrollY > end) translateY = 0;
                                    if (scrollY < start) translateY = 100;
                                }



                                return (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Imagen ${index}`}
                                        className="overlay-image"
                                        style={{
                                            transform: `translateY(${translateY}%)`,
                                            zIndex: index,
                                        }}

                                      
                                    />
                                  
                                );
                            })}
                        </div>
                        <div style={{ height: `${producto?.imagenes?.length * 70}vh` , position:'relative'}}></div>

                    </div>


              





                </section>

                {
                        producto && (

                            <div className="Info-boton">



                            <div className="Info-producto">

                                <div className="producto-nombrePrecio">
                                <h3 className="producto-nombre">{producto.nombre}</h3>
                                <h3 className="producto-precio"> {producto.precio}€</h3>
                                </div>




                                <p className="producto-descripcion">{producto.descripcion}</p>
                                <div className="Btn-cart">
                            <Button variant = 'action' onClick={() => addToCart(producto)}>AÑADIR AL CARRITO</Button>
                            </div>

                            </div>

                            </div>
                           

                           
                            
                        )

                        
                    }


                   


                  

            </main>
        </>
    );
};

export default Product;
