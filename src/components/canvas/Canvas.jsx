import './canvas.css'
import { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

const Canvas = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const [hasCleared, setHasCleared] = useState(false);
    const [isVisible, setIsVisible] = useState(false);



    const [pointerStartPos, setPointerStartPos] = useState({ x: 0, y: 0 });
    const [hasMoved, setHasMoved] = useState(false);
    const [pointerStartTime, setPointerStartTime] = useState(0);


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
        
        const pos = getPointerPos(canvas, e);
        
        // Guardar posición inicial y tiempo para detectar click vs drag
        setPointerStartPos(pos);
        setPointerStartTime(Date.now());
        setHasMoved(false);
        setIsDrawing(true);
        
        // NO prevenir el evento aquí - esperamos a ver si es click o drag
        
        const context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(pos.x, pos.y);
    };

    // Función que se llama cuando el usuario mueve el pointer mientras dibuja
    const draw = (e) => {
        if (!isDrawing) return;

      
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
       const pos = getPointerPos(canvas, e);
        
        // Calcular la distancia desde el punto inicial
        const distance = Math.sqrt(
            Math.pow(pos.x - pointerStartPos.x, 2) + 
            Math.pow(pos.y - pointerStartPos.y, 2)
        );
        
        // Si se ha movido más de 8px, consideramos que está dibujando
        if (distance > 8) {
            if (!hasMoved) {
                // Primera vez que detectamos movimiento - ahora sí prevenir eventos
                setHasMoved(true);
               
            }


            e.preventDefault();
            e.stopPropagation();
            
            const context = canvas.getContext('2d');
            context.lineTo(pos.x, pos.y);
            context.stroke();

            if (!hasDrawn) {
                setHasDrawn(true);
                setHasCleared(false);
                setIsVisible(true);
            }
            
            // if (hasMoved) {
            //     e.preventDefault();
            //     e.stopPropagation();
            // }
        }
    };

    const stopDrawing = (e) => {
        if (!isDrawing) return;
        
        const timeDiff = Date.now() - pointerStartTime;

        setIsDrawing(false)
        setHasMoved(false)
        
        // Si no se movió y fue un click rápido (menos de 200ms)
        if (!hasMoved && timeDiff < 200) {
            // Buscar el elemento que está debajo del canvas en esa posición
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const absoluteX = pointerStartPos.x + rect.left;
            const absoluteY = pointerStartPos.y + rect.top;
            
            // Temporalmente ocultar el canvas para encontrar el elemento debajo
            canvas.style.pointerEvents = 'none';
            const elementBelow = document.elementFromPoint(absoluteX, absoluteY);
            canvas.style.pointerEvents = 'auto';
            
            // Si es un link o está dentro de un link, activarlo
            if (elementBelow) {
                const linkElement = elementBelow.closest('a') || 
                                  (elementBelow.tagName.toLowerCase() === 'a' ? elementBelow : null);
                
                if (linkElement) {
                    // Simular click en el link
                    linkElement.click();
                }
            }
        } else if (hasMoved) {
            // Solo prevenir si realmente se dibujó
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        }


        // const canvas = canvasRef.current;
        // if(canvas) {
        //     const context=canvas.getContext('2d');
        //     context.closePath()
        // }
    
    
    
    }

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
                className={`Canvas ${isDrawing ? 'drawing' : ''}`}
                ref={canvasRef}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                onPointerCancel={stopDrawing}
              
            />
        </>
    );
});

export default Canvas;