import './product.css';
import { Header } from '../../components/header/Header';

const Prueba = () => {


  const imagenes = [


    { id: 1, src: '/img/1.png' },
    { id: 2, src: '/img/2.png' },
    { id: 3, src: '/img/3.png' }


  ];


  return (

    <>
   
<Header />

<main className="Main-prueba">
    {/* <section className="Galeria">
    <div className="contenedor-scroll">
      {imagenes.map((img) => (
        <section className="seccion" key={img.id}>
          <img className='img'src={img.src} alt={`Imagen ${img.id}`} />
        </section>
      ))}
    </div>

    <div className="contenedor-descripcion">
        <h3 className="nombre">NOMBRE</h3>
        <p className="Descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ducimus natus quaerat libero tenetur ad quos saepe. Explicabo ab necessitatibus quidem exercitationem, iure quisquam hic tempore delectus officiis aliquid numquam?</p>
    </div>
    </section> */}
    </main>



    </>
  );
};

export default Prueba;
