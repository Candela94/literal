
import { useEffect, useRef, useState } from "react";
import { Header } from "../../components/header/Header";
import './landing.css'

import { CardIG } from '../../components/cards/Cards'
import { Manifiesto } from "../../components/manifiesto/Manifiesto";

import { CardProducto } from "../../components/cards/Cards";


const Landing = () => {



    const [manifiesto, setManifiesto] = useState(false)

    const manifiestoRef = useRef(null)


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


                {
                    manifiesto && <Manifiesto ref={manifiestoRef}/>
                }



                <div className="Galeria">

                    <CardProducto />
                </div>


            </main>





        </>
    );




}

export default Landing;