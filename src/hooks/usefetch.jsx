




//Obtener todos los productos 

import { useEffect, useState } from "react";




export const useFetchAll = () => {


    const VITE_URL = import.meta.env.VITE_URL
    const [load, setLoad] = useState(true)

    const [error, setError] = useState(null)

    const [productos, setProductos] = useState([])



    const obtenerProductos = async () => {

        try {

            const response = await fetch(`${VITE_URL}/api/v1/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },

            })


            if (!response.ok) {
                throw new Error(`Error:, ${response.status}`)
            }

            const data = await response.json();
            console.log('response data', data)


            setProductos(data.data)






        } catch (e) {

            setError(e.message || 'Error al obtener productos')



        } finally {
            setLoad(false)
        }
    }



    useEffect(() => {
        obtenerProductos()
    }, [])



    return { productos, load, error };
}







export const useFetchProduct = () => {
    const VITE_URL = import.meta.env.VITE_URL;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [producto, setProducto] = useState(null);

    const obtenerProducto = async (pid) => {
        try {
            const response = await fetch(`${VITE_URL}/api/v1/products/${pid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Producto individual:', data);
            setProducto(data.data); // Asegúrate de que sea .data

        } catch (e) {
            setError(e.message || 'Error al obtener producto');
        } finally {
            setLoading(false);
        }
    };





    
    return { obtenerProducto, producto, loading, error };
};
