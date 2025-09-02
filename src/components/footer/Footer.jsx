



import './footer.css'



export const Footer = () => {


    return (

        <>

            <footer className="Footer">
                <div className="Footer-img">
                    <img src='/img/logo.png' alt="logo" className="Footer-literal" />
                </div>


                <nav className="Footer-nav">


                    <div className="Footer-nav1">
                        <ul className="Footer-ul1">
                            <li className="Footer-li">AVISO LEGAL</li>
                            <li className="Footer-li">POLÍTICA DE COOKIES</li>
                            <li className="Footer-li">TÉRMINOS Y CONDICIONES</li>
                        </ul>

                    </div>



                    <div className="Footer-nav2">
                        <ul className="Footer-ul2">
                            <li className="Footer-li">PREGUNTAS FRECUENTES</li>
                            <li className="Footer-li">POLÍTICA DE ENVÍO</li>
                            <li className="Footer-li">POLÍTICA DE DEVOLUCIONES</li>
                        </ul>
                    </div>


                    <div className="Footer-nav3">
                        <ul className="Footer-ul3">
                            <li className="Footer-li">CONTACTO</li>
                            <li className="Footer-li">IG</li>

                        </ul>
                    </div>


                </nav>


            </footer>


        </>



    );



}