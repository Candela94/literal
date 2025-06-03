import './canvas.css'
import { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

const Canvas = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const [hasCleared, setHasCleared] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        clearCanvas
    }));

    // Función para obtener las coordenadas correctas del mouse
    const getMousePos = (canvas, e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Función para redimensionar el canvas
        const resizeCanvas = () => {
            const ratio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * ratio;
            canvas.height = window.innerHeight * ratio;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
            context.scale(ratio, ratio);
            context.lineWidth = 3;
            context.lineCap = 'round';
            context.strokeStyle = '#FF69B4';
        };

        resizeCanvas();
        
        // Escuchar cambios de tamaño de ventana
        window.addEventListener('resize', resizeCanvas);
        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        
        };
    }, []);

    // Función para cuando el usuario empieza a dibujar
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        e.preventDefault();
        const pos = getMousePos(canvas, e);
        const context = canvas.getContext('2d');

        context.beginPath();
        context.moveTo(pos.x, pos.y);
        setIsDrawing(true);
    };

    // Función que se llama cuando el usuario mueve el ratón mientras dibuja
    const draw = (e) => {
        if (!isDrawing) return;

        e.preventDefault();
        const canvas = canvasRef.current;
        const pos = getMousePos(canvas, e);
        const context = canvas.getContext('2d');

        context.lineTo(pos.x, pos.y);
        context.stroke();

        if (!hasDrawn) {
            setHasDrawn(true);
            setHasCleared(false);
            setIsVisible(true);
        }
    };




    const stopDrawing = () => {

        e.preventDefault();
        const context = canvasRef.current.getContext('2d');
        context.closePath();
        setIsDrawing(false);
    };




    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        setHasCleared(true);
        setHasDrawn(false);

        setTimeout(() => {
            setHasCleared(false);
            setIsVisible(false);
        }, 1000);
    };

    return (
        <>
            <canvas
                className='Canvas'
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}


                onTouchStart={startDrawing}  
                onTouchMove={draw}           
                onTouchEnd={stopDrawing}    
                onTouchCancel={stopDrawing}
            />
        </>
    );
});

export default Canvas;