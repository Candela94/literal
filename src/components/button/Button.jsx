


import './button.css'


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
                {children}
            </button>


        </>
    );



}