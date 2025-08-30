
import { useEffect, useRef, useState } from "react";
import { Header } from "../../components/header/Header";
import './landing.css'

import { CardIG } from '../../components/cards/Cards'
import { Manifiesto } from "../../components/manifiesto/Manifiesto";

import { CardProducto } from "../../components/cards/Cards";
import { useFetchAll } from "../../hooks/usefetch";


const Landing = () => {



    const [manifiesto, setManifiesto] = useState(false)

    const manifiestoRef = useRef(null)

    const { productos, load, error } = useFetchAll()


    useEffect(() => {

        const handleClickOutside = (e) => {

            if (manifiesto && manifiestoRef.current && !manifiestoRef.current.contains(e.target)) {
                setManifiesto(false);

            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [manifiesto])







    return (
        <>
          <Header onClickManifiesto={() => setManifiesto(prev => !prev)} />
      
          <main className="Main">
      
            {manifiesto && <Manifiesto ref={manifiestoRef} />}
      
            {
              load ? (
                <p className="Mensaje">Cargando proyectos</p>
              ) : error ? (
                <p className="Mensaje">Error al cargar: {error}</p>
              ) : productos.length > 0 ? (
                <ul className="Galeria-ul">
                  {
                    productos.map((producto) => (
                      <li className="Galeria-li" key={producto._id}>
                        <CardProducto producto={producto} />
                      </li>
                    ))
                  }
                </ul>
              ) : (
                <p className="Mensaje">No hay productos disponibles</p>
              )
            }
      
          </main>
        </>
      );
      



}

export default Landing;