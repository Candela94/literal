
import '../css/index.css'
import './coming.css'
import Canvas from '../components/canvas/Canvas';
import { useRef } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";





const Comming = () => {

    const canvasRef = useRef();

    const handleClear = () => {

        if (canvasRef.current) {
            canvasRef.current.clearCanvas(); // Llama a la función del canvas
          }
       
    }

    return (

        <>

        <main className="Main">

            <div className="Main-texto1">
                <p className="texto delay-3">001</p>
                <p className="texto delay-1">CREATIVE BRAND</p>
            </div>

            <div className="Main-titulo">
                <h1 className="Titulo">LITERAL</h1>
                <p className="Literal-texto">C</p>
            </div>


            <div className="Main-texto2">
              <span className="Main-span"> <p className="texto delay-2">COMING SOON · 2025  </p><FaArrowRightLong />

              </span>
                <div className="texto delay-4">IG @LITERAL___</div>
            </div>


            <Canvas ref={canvasRef}/>
           
        </main>
        <button className="Button" onClick={handleClear}>CLEAR</button>




        
        
        </>



      );




}
 
export default Comming;