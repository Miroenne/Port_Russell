import '../style/bootstrap.min.css';
import '../style/style.css';
import {use, useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const Confirm = () => {

    const location = useLocation();
    const rawOrigin =location.state?.origin || '';
    const [origin, setOrigin] = useState('');
    const [returnOrigin, setReturnOrigin] = useState('');
    const [method, setMethod] = useState('');

    useEffect(() => {
        const modalElement = document.getElementsByClassName("modal-backdrop fade show")[0];
        if(modalElement && modalElement.classList.contains('show')){
            modalElement.classList.remove('modal-backdrop', 'show');
            modalElement.classList.add('modal');
        }
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
    if(location.state && location.state.origin){                
        if(rawOrigin.toLowerCase().includes('users')){
            if(location.state.method === 'delete'){
                setMethod("L'utilisateur a été supprimé avec succès.");
            }else if(location.state.method.toLowerCase() === 'put'){
                setMethod("L'utilisateur a été modifié avec succès.");
            }
            else{
                setMethod("L'utilisateur a été ajouté avec succès.");
            }
            setOrigin('utilisateurs');
            setReturnOrigin('users');
        }else if(rawOrigin.toLowerCase().includes('catways')){
            if(location.state.method === 'delete'){
                setMethod("Le catway a été supprimé avec succès.");
            }else if(location.state.method.toLowerCase() === 'put'){
                setMethod("Le catway a été modifié avec succès.");
            }
            else{
                setMethod("Le catway a été ajouté avec succès.");
            }
            setOrigin('catways');
            setReturnOrigin('catways');
        }else if(rawOrigin.toLowerCase().includes('reservations')){
            if(location.state.method === 'delete'){
                setMethod("La réservation a été supprimée avec succès.");
            }else if(location.state.method.toLowerCase() === 'put'){
                setMethod("La réservation a été modifiée avec succès.");
            }
            else{
                setMethod("La réservation a été ajoutée avec succès.");
            }
            setOrigin('reservations');
            setReturnOrigin('reservations');
        }
    }else{
        console.error('No origin provided in location state');
    }
    }, [location.state]);

    setTimeout(() => {        
            navigate(`/${returnOrigin}`);
        }, 3000);

    return(
        <div>
            <h1>Confirmation</h1>
            <p>{method}</p>
            <p>Vous allez être redirigé vers la page des {origin} dans quelques secondes...</p>
            <div class="container-fluid fs-3">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Confirm;