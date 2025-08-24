
import './product.css'
import { Header } from '../../components/header/Header';
import { useState } from 'react';





const Product = () => {


    const [description, setDescription] = useState(false)

    const handleDescription = () => {
        setDescription(prev => !prev)
    }






    return (


        <>

            <Header />

            <main className="Main-product">

                <div className="Imagen">
                    <img src="./img/img-default.png" alt="product" className="Imagen-producto" />

                </div>

                <div className="Info-producto">

                    <div className="Nombre-precio">
                        <h2 className="Nombre">NOMBRE PRODUCTO</h2>
                        <p className="Precio">€</p>

                    </div>

                    <div className="Desc-producto">
                        <p className="Descripcion">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius ex voluptas officia, perspiciatis sint minus nisi eligendi. Id sed vero amet aut. Officia eligendi placeat minima soluta magnam reprehenderit omnis.</p>
                    </div>

                    <div className="Linea-uno Linea"></div>


                     <div className="Desc-producto" onClick={handleDescription}>
                       <p className="Descripcion-opcion">DESCRIPCIÓN</p>
                     </div> 

                     <div className="Linea-dos Linea"></div>

                     {
                        description && (

                        <div className="Desc-producto">
                        <p className="Descripcion">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius ex voluptas officia, perspiciatis sint minus nisi eligendi. Id sed vero amet aut. Officia eligendi placeat minima soluta magnam reprehenderit omnis.</p>
                    </div>
                        )
                     }



                </div> 



            





            </main>



        </>



    );
}

export default Product;