

import './checkout.css'
import { FormAdress } from '../../components/formPayment/FormAdress';
import { FormPayment } from '../../components/formPayment/FormPayment';
// import { loadStripe } from '@stripe/stripe-js'
import { Header } from '../../components/header/Header';
import { useState } from 'react';


const CheckOut = () => {

  const [step, setStep] = useState(1);

  const [datosEnvio, setDatosEnvio] = useState({


    email: "",
    nombre: "",
    direccion: "",
    ciudad: "",
    cp: ""


  });



  const [datosPago, setDatosPago] = useState({

    paymentMethod: "tarjeta" // o "paypal", (lo tengo así definido en el backend)


  })




  return (
    <>

      <Header />

      <main className="Main-payment">

        {
          step === 1 && (


            <FormAdress 
            datos={datosEnvio}
            setDatos={setDatosEnvio} 
            onNext={() => setStep(2)}/>
           
          

          )
        }


        {

          step === 2 && (

            <FormPayment/>
          )
        }



      </main>


    </>
  );
}

export default CheckOut;