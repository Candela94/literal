
import './header.css'


export const Header = () => {


    return ( 

        <>

        <header className='Header'>
            <nav className="Header-nav">

            <img src="/literal-favicon.svg" alt="logo" className="Logo-mobile" />
            <img src="/img/literal-logo.svg" alt="logo" className="Logo-dekstop" />
                
                <ul className="Header-ul">
                    <li className="Header-li ">PRODUCTOS</li>
                    <li className="Header-li ">CONTACTO</li>
                </ul>
            </nav>
        </header>
        
        
        
        </>
     );



}