
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
                <p className="texto delay-1">001</p>
                <p className="texto delay-1">CREATIVE BRAND</p>
            </div>

            <div className="Main-titulo">
          
        <h1 className="Titulo">LITERAL</h1>
        <span className="Literal-texto"><p className="Literal-copy">C</p></span>
    </div>
           


            <div className="Main-texto2">
              <div className="Main-span texto delay-1"> <span className="Span">COMING SOON · 2025  </span><FaArrowRightLong  />

              </div>
                <div className="texto delay-1">IG @LITERAL___</div>
            </div>


            <Canvas ref={canvasRef}/>
           
        </main>
        <button className="Button delay-3" onClick={handleClear}>CLEAR</button>




        
        
        </>



      );




}
 
export default Comming;