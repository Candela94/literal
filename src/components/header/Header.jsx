
import './header.css'
import { CardIG } from '../cards/Cards';

export const Header = ({onClickManifiesto}) => {


    return (

        <>


            <header className='Header'>

                <div className="Titulo-logo">
                    <h1 className="Titulo">LA WEB DE</h1>
                    <img src='/img/logo.png' alt="logo" className="Logo" />
                </div>

                <nav className="Header-nav">

                    <CardIG />


                    <ul className="Header-ul">
                        <li className="Header-li" onClick={onClickManifiesto}>MANIFIESTO</li>
                        <li className="Header-li">CARRITO(0)</li>
                    </ul>

                </nav>




            </header>



        </>
    );



}