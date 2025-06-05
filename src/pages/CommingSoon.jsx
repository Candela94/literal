
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
          
        
        <svg enable-background="new 0 0 961.94 225.83" viewBox="0 0 961.94 225.83" xmlns="http://www.w3.org/2000/svg"><path d="m72.73 32.33h-40.83v161.74h32.62 8.21 69.58v-35.13h-69.58z"/><path d="m152.12 32.33h40.84v161.75h-40.84z"/><path d="m202.31 67.46h49.27v126.61h40.84v-126.61h49.73v-35.13h-139.84z"/><path d="m392.34 128.37h70.95v-33.54h-70.95v-28.06h78.02v-34.44h-78.02-8.44-32.4v161.74h32.4 8.44 79.16v-34.44h-79.16z"/><path d="m578.04 122.55c8.52-4.03 15.17-9.62 19.96-16.77s7.19-15.59 7.19-25.32c0-9.58-2.36-17.94-7.07-25.09-4.72-7.15-11.22-12.78-19.51-16.88-8.29-4.11-17.83-6.16-28.63-6.16h-28.29-8.44-32.39v161.75h40.84v-65.48h2.4l44.37 65.47h47.22l-49.39-67.47c4.17-.99 8.1-2.32 11.74-4.05zm-33.99-59.88c6.54 0 11.6 1.71 15.17 5.13s5.36 7.87 5.36 13.35c0 5.63-1.79 10.12-5.36 13.46-3.57 3.35-8.63 5.02-15.17 5.02h-22.36v-36.96z"/><path d="m679.55 32.33-62.96 161.75h42.2l9.87-28.29h60.02l9.73 28.29h42.89l-62.28-161.75zm.42 101.06 18.92-54.21 18.65 54.21z"/><path d="m827.94 32.33h-40.84v161.74h32.63 8.21 69.58v-35.13h-69.58z"/><path d="m899.26 64.99c4.22 0 6.83 1.37 8.57 5.1l12.3-5.84c-2.86-8.33-10.31-13.67-21.5-13.67-15.04 0-23.74 9.2-23.74 23.74s8.7 23.74 23.74 23.74c11.06 0 17.4-4.35 21.37-14.42l-11.68-5.59c-1.74 4.35-4.85 5.59-9.07 5.59-5.59 0-9.2-3.35-9.2-9.32.01-6.1 3.62-9.33 9.21-9.33z"/><path d="m897.52 32.06c-24.98 0-42.75 17.4-42.75 42.25s17.77 42.25 42.75 42.25 42.75-17.4 42.75-42.25c0-24.86-17.77-42.25-42.75-42.25zm0 74.06c-19.01 0-31.94-13.17-31.94-31.81s12.92-31.81 31.94-31.81c19.01 0 31.94 13.17 31.94 31.81s-12.93 31.81-31.94 31.81z"/></svg>
    </div>
           


    <div className="Main-texto2">
    <div className="Main-span texto delay-1"> 
        <span className="Span">COMING SOON · 2025</span>
        <FaArrowRightLong />
    </div>
    
    <a 
        href="https://www.instagram.com/literal_____/" 
        target='_blank'
        rel="noopener noreferrer"
        className="texto delay-1 instagram"
    >
        IG @LITERAL_____
    </a>
</div>

            <Canvas ref={canvasRef}/>
           
        </main>
        <button className="Button delay-3" onClick={handleClear}>CLEAR</button>




        
        
        </>



      );




}
 
export default Comming;