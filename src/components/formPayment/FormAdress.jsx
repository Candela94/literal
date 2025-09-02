

import { useState } from "react";
import { Button } from "../button/Button";
import './form.css'



export const FormAdress = ({datos, setDatos, onNext}) => {






    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof onNext === "function") onNext();
      };


    return (


        <>


            <form onSubmit={handleSubmit} className="Formulario">

                <div className="Datos">
                    <input type="text" className="Formulario-input" placeholder='NOMBRE'
                        name="nombre"
                        value={datos.nombre}
                        onChange={handleChange} />

                    <input type="email" className="Formulario-input" placeholder='E-MAIL'
                        name="email"
                        value={datos.email}
                        onChange={handleChange} />

                    <input type="text" className="Formulario-input" placeholder='DIRECCIÓN DE ENVÍO'
                        name="direccion"
                        value={datos.direccion}
                        onChange={handleChange} />

                    <input type="text" className="Formulario-input" placeholder='CIUDAD'
                        name="ciudad"
                        value={datos.ciudad}
                        onChange={handleChange} />

                    <input type="text" className="Formulario-input" placeholder='CP'
                        name="cp"
                        value={datos.cp}
                        onChange={handleChange} />

                </div>

                <Button variant="primary">IR AL PROCESO DE PAGO
                </Button>
            </form>



        </>
    );




}