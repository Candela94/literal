


import './button.css'
import Shuffle from '../suffle/Suffle';


export const Button = ({ children, onClick, disabled = false ,  variant = 'primary',  type}) => {

    const btnClass = () => {

        switch(variant){
            
         
            case 'primary' : return 'primary';
            case 'secondary' : return 'secondary';
            case 'danger' : return 'danger';
            case 'disabled' : return 'disabled';
            case 'action': return 'action'
        

            default: return 'primary'



        }
    }



    return (
        <>




            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`btn ${btnClass()} `}
            >
               <span>

<Shuffle
  text={children}
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover={true}
  respectReducedMotion={true}
/></span> 
            </button>


        </>
    );



}