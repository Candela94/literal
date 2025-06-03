
import '../css/index.css'
import './coming.css'
import Canvas from '../components/canvas/Canvas';
import { useRef } from 'react';

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
                <p className="texto">001</p>
                <p className="texto">CREATIVE BRAND</p>
            </div>

            <div className="Main-titulo">
                <h1 className="Titulo">LITERAL</h1>
                <p className="Literal-texto">C</p>
            </div>


            <div className="Main-texto2">
                <p className="texto">COMING SOON · 2025  </p>
                <div className="texto">IG @LITERAL___</div>
            </div>



           
        </main>
        <button className="Button" onClick={handleClear}>CLEAR</button>


<Canvas ref={canvasRef}/>

        
        
        </>



      );




}
 
export default Comming;