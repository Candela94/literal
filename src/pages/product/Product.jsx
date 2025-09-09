import './product.css';
import { HeaderSmall } from '../../components/header/Header';
import { useState, useEffect, useRef } from 'react';
import { useFetchProduct } from '../../hooks/usefetch';
import { useParams } from 'react-router';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/button/Button';

const Product = () => {
  const { pid } = useParams();
  const { addToCart } = useCart();
  const { producto, obtenerProducto } = useFetchProduct();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [animatingThumbnails, setAnimatingThumbnails] = useState(new Set());
  const imageRefs = useRef([]);

  useEffect(() => {
    if (pid) {
      obtenerProducto(pid);
    }
  }, [pid]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setPrevIndex(currentIndex);
            setCurrentIndex(index);
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [producto, currentIndex]);

  // Efecto para manejar las animaciones de las miniaturas
  useEffect(() => {
    if (prevIndex !== currentIndex) {
      // Identificar qué miniaturas deben desaparecer
      const thumbnailsToHide = new Set();
      
      // Si el índice aumentó, las miniaturas anteriores deben desaparecer
      for (let i = prevIndex; i < currentIndex; i++) {
        thumbnailsToHide.add(i);
      }

      if (thumbnailsToHide.size > 0) {
        // Marcar las miniaturas para animación de salida
        setAnimatingThumbnails(thumbnailsToHide);
        
        // Después de la animación, limpiar el estado
        setTimeout(() => {
          setAnimatingThumbnails(new Set());
        }, 300); // Duración de la animación
      }
    }
  }, [currentIndex, prevIndex]);

  // Filtrar las miniaturas que deben mostrarse
  const miniaturasVisibles = producto?.imagenes?.filter((_, i) => i >= currentIndex) || [];

  return (
    <>
      <HeaderSmall />
      <main className="Main-product">
        <section className="Galeria-imagenes">
          {producto?.imagenes && (
            <div className="galeria-contenedor">
              {producto.imagenes.map((img, id) => (
                <div
                  key={id}
                  className="imagen-galeria"
                  ref={(el) => (imageRefs.current[id] = el)}
                  data-index={id}
                >
                  <img src={img} alt={`Imagen ${id + 1}`} />
                </div>
              ))}
            </div>
          )}

          {/* Contenedor de miniaturas con posición absoluta */}
          {miniaturasVisibles.length > 0 && (
            <div className="Galeria-miniaturas">
              <div className="miniaturas-contenedor">
                {miniaturasVisibles.map((image, i) => {
                  const originalIndex = currentIndex + i;
                  const isAnimating = animatingThumbnails.has(originalIndex);
                  
                  return (
                    <img
                      src={image}
                      alt={`Miniatura ${originalIndex + 1}`}
                      key={originalIndex}
                      className={`miniaturas ${isAnimating ? 'miniatura-fade-out' : 'miniatura-fade-in'}`}
                      onClick={() =>
                        imageRefs.current[originalIndex]?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                      }
                    />
                  );
                })}
              </div>
            </div>
          )}
        </section>
            
        <section className="info-producto">
          {producto && (
            <div className="info-descripcion">
              <div className="info-texto">
                <div className="producto-nombre-precio">
                  <h3 className="producto-nombre">{producto.nombre}</h3>
                  <h3 className="producto-precio">{producto.precio}€</h3>
                </div>
                <p className="producto-descripcion">{producto.descripcion}</p>
              </div>
              
              <div className="btn-cart">
                <Button variant="action" onClick={() => addToCart(producto)}>
                  AÑADIR AL CARRITO
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Product;