import '../style/bootstrap.min.css';
import '../style/style.css';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Confirm = () => {
    
    useEffect(() => {
        const modalElement = document.getElementsByClassName("modal-backdrop fade show")[0];
        if(modalElement && modalElement.classList.contains('show')){
            modalElement.classList.remove('modal-backdrop', 'show');
            modalElement.classList.add('modal');
        }
    }, []);

    const navigate = useNavigate();

    setTimeout(() => {        
        navigate('/users');
    }, 3000);

    return(
        <div>
            <h1>Confirmation</h1>
            <p>Votre demande a été soumise avec succès.</p>
            <p>Vous allez être redirigé vers la page des utilisateurs dans quelques secondes...</p>
            <div class="container-fluid fs-3">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Confirm;