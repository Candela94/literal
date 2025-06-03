

import './canvas.css'
import { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';



const Canvas = forwardRef((props,ref)=> {  

    const canvasRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false); //Estado para saber si el usuario está dibujando o no 

    const [hasDrawn, setHasDrawn] = useState(false);
    const [hasCleared, setHasCleared] = useState(false)
    const [isVisible, setIsVisible] = useState(false)


    useImperativeHandle(ref, () => ({
        clearCanvas
      }));
    


    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');


        //Ajustamos tamaño de canvas, aquí y no en css para dibujar a la resolución que corresponde. con CSS se vería mal 

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        context.lineWidth = 3;
        context.lineCap = 'round';
        context.strokeStyle = '#FF69B4'


    }, [])




    //Función para cuando el usuario empieza a dibujar 
    const startDrawing = ({ nativeEvent }) => {

        const { offsetX, offsetY } = nativeEvent; //obtener posición del mouse dentro del canvas 

        const context = canvasRef.current.getContext('2d');

        context.beginPath(); //Empezamos un nuevo camino de dibujo 
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true)
       
    }





    //Función que se llama cuando el usuario mueve el ratón mientras dibuja
    const draw = ({ nativeEvent }) => {

        if (!isDrawing) return;


        const { offsetX, offsetY } = nativeEvent;
        const context = canvasRef.current.getContext('2d');


        context.lineTo(offsetX, offsetY);
        context.stroke();

        if(!hasDrawn) {
            setHasDrawn(true)
            setHasCleared(false)
            setIsVisible(true)
        }

    }







    const stopDrawing = () => {
        const context = canvasRef.current.getContext('2d');
        context.closePath(); // Cerramos el camino de dibujo
        setIsDrawing(false); // Ya no está dibujando
      };




    const clearCanvas = () => {

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            context.clearRect(0,0,canvas.width, canvas.height)

            setHasCleared(true)
            setHasDrawn(false)

            setTimeout(() => {
                setHasCleared(false)
                setIsVisible(false)
            },1000)
    }  




    return (


        <>

         
              
                <canvas
                className='Canvas'
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}/>

              {/* {isVisible && (
                  <button 
                  onClick={clear}
               
                  className={`Boton ${isVisible ?  'visible':''}`}>{hasCleared ? 'Dibujo borrado jiji' : 'Borrar dibujo, es un poco feo :('}</button>
              )} */}
           

        </>


    );
})

export default Canvas;