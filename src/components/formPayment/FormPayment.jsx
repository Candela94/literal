

import { useState } from "react";
import { Button } from "../button/Button";
import './form.css'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";



export const FormPayment = ({ amount = 5000, datosEnvio = {}, onPaid, onBack }) => {



    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [paid, setPaid] = useState(false);



    const API_URL = import.meta.env.VITE_URL_LOCAL ?? "http://localhost:3000";




    const handlePay = async (e) => {

        e.preventDefault();
        setErrorMsg('');

        if (!stripe || !elements) return;


        try {

            setLoading(true);


            //1) pedimos clientSecret a mi backend

            const res = await fetch(`${API_URL}/api/v1/create-payment`, {


                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ amount }), //centimos 
            });



            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.error || `Error ${res.status}`);
            }



            const { clientSecret } = await res.json();



            //2)confirmar pago con la tarjeta 

            const result = await stripe.confirmCardPayment(clientSecret, {

                payment_method: {
                    card:elements.getElement(CardElement),

                    billing_details:{

                        name:datosEnvio?.nombre || 'Cliente LITERAL',
                        email:datosEnvio?.email || undefined,
                    }
                }
            })



            if (result.error) {
                setErrorMsg(result.error.message || "Error al procesar el pago");
                return;
              }
        
              if (result.paymentIntent?.status === "succeeded") {
                setPaid(true);
                onPaid?.(result.paymentIntent);
              } else {
                setErrorMsg("El pago no se ha completado.");
              }







        } catch (e) {
            setErrorMsg(e.message || "Error inesperado");



        }
    }




    return (


        <>

<form onSubmit={handlePay} className="Formulario">
      <h2 className="text-xl font-semibold mb-4">INFORMACIÓN DE PAGO</h2>



      <div className="Datos">


        {/* Aquí va el CardElement con tu estilo */}


        <div className="Formulario-input">


          <CardElement
            options={{

              style: {

                base: {
                  fontFamily: "outfit-medium, sans-serif",
                  fontSize: "16px",
                  color: "#000000",
                  "::placeholder": {
                    color: "#666666",
                  },

                },

                
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />


        </div>
      </div>

      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <div className="flex gap-3 mt-4">
        <Button type="button" variant="secondary" onClick={onBack}>
          ← Volver
        </Button>
        <Button type="submit" variant="primary" disabled={!stripe || loading || paid}>
          {paid ? "✅ Pagado" : loading ? "Procesando…" : `Pagar ${(amount / 100).toFixed(2)} €`}
        </Button>
      </div>
    </form>
  




        </>
    );




}