// src/pages/carrito/Carrito.jsx
import './carrito.css'
import { HeaderCarrito } from '../../components/header/Header';
import { CardCarrito } from '../../components/cards/Cards';
import { useCart } from '../../context/CartContext';
import { NavLink } from 'react-router'; 
import { Button } from '../../components/button/Button';





const Carrito = () => {



  const { cartItems } = useCart();

  const estaVacio = cartItems.length === 0;



  //Función que recorre el array del carrito y hace el cálculo del subtotal
  const subtotal = cartItems.reduce(
    (acc, i) => acc + (Number(i.precio) || 0) * i.quantity,
    0
  );





  return (
    <>
      <HeaderCarrito />

      <main className="Main-carrito">


        {estaVacio ? (

          <div className="Mensaje">
            <p className="Mensaje-p">TU CARRITO ESTÁ VACÍO</p>
            <NavLink to='/' className="Btn-ir-tienda"><Button variant='primary'>IR A TIENDA</Button></NavLink>
          </div>



        ) : (
          <ul className="Carrito-lista">


            {cartItems.map(item => (
              <li key={item._id}>
                <CardCarrito item={item} />
              </li>


            ))}
          </ul>


        )}
      </main>

      {/*Footer solo cuando hay productos */}
     
        <footer className="Footer-cart">

        {!estaVacio && (

            <>
          <div className="Footer-subtotal">
            <p className="Subtotal">SUBTOTAL:</p>
            <p className="Cantidad">{subtotal.toFixed(2)} €</p>
          </div>

          <Button variant='action' className='Btn-footer'>
            FINALIZAR COMPRA
          </Button></>



      )}

          <p className="Footer-info">
            PRECIOS CON IMPUESTOS INCLUÍDOS. LOS GASTOS DE ENVÍO SE CALCULAN EN EL SIGUIENTE PASO SEGÚN TU DIRECCIÓN DE ENTREGA. ENVÍO GRATUITO PARA PEDIDOS SUPERIORES A 200€. TAMBIÉN PUEDES RECOGER TU PEDIDO DE FORMA GRATUITA EN HOSPITALET, BARCELONA. SE ACEPTAN PAGOS MEDIANTE TARJETA O PAYPAL.
          </p>
        </footer>
      
    </>
  );
};

export default Carrito;
