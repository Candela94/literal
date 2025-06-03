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

    // Función para obtener las coordenadas correctas del pointer
    const getPointerPos = (canvas, e) => {
        const rect = canvas.getBoundingClientRect();
        
        // Usar las coordenadas del pointer event directamente
        const clientX = e.clientX;
        const clientY = e.clientY;
        
        // Calcular la posición relativa al canvas SIN el devicePixelRatio
        // porque ya lo manejamos en el contexto
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Función para redimensionar el canvas
        const resizeCanvas = () => {
            const ratio = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Configurar el tamaño del canvas
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            
            // Configurar el tamaño visual
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            // Escalar el contexto para que coincida con el devicePixelRatio
            context.scale(ratio, ratio);
            context.lineWidth = 1.5;
            context.lineCap = 'round';
            context.strokeStyle = '#F24283';
            context.shadowColor = '#F24283'; // Mismo color para un efecto glow
    context.shadowBlur = 7;      
            context.imageSmoothingEnabled = true;
        };

        resizeCanvas();

        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        };

        // Escuchar cambios de tamaño de ventana
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    // Función para cuando el usuario empieza a dibujar
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const pos = getPointerPos(canvas, e);
        const context = canvas.getContext('2d');

        context.beginPath();
        context.moveTo(pos.x, pos.y);
        setIsDrawing(true);
    };

    // Función que se llama cuando el usuario mueve el pointer mientras dibuja
    const draw = (e) => {
        if (!isDrawing) return;

        e.preventDefault();
        e.stopPropagation();
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const pos = getPointerPos(canvas, e);
        const context = canvas.getContext('2d');

        context.lineTo(pos.x, pos.y);
        context.stroke();

        if (!hasDrawn) {
            setHasDrawn(true);
            setHasCleared(false);
            setIsVisible(true);
        }
    };

    const stopDrawing = (e) => {
        if (!isDrawing) return;
        
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        context.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
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
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                onPointerCancel={stopDrawing}
                style={{ touchAction: 'none' }}
            />
        </>
    );
});

export default Canvas;