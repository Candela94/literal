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
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Función para redimensionar el canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
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
        const pos = getMousePos(canvas, e);
        const context = canvas.getContext('2d');

        context.beginPath();
        context.moveTo(pos.x, pos.y);
        setIsDrawing(true);
    };

    // Función que se llama cuando el usuario mueve el ratón mientras dibuja
    const draw = (e) => {
        if (!isDrawing) return;

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
            />
        </>
    );
});

export default Canvas;