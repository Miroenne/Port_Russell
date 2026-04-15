import '../style/bootstrap.min.css';
import '../style/style.css';
import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

/**
 * Confirm Component
 * Displays a feedback message after a CRUD operation (Create, Update, Delete)
 * and automatically redirects the user back to the origin page.
 */
const Confirm = () => {

    const location = useLocation();
    const rawOrigin =location.state?.origin || '';
    const [origin, setOrigin] = useState('');
    const [returnOrigin, setReturnOrigin] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');

    /**
     * DOM Cleanup Effect
     * Specifically targets and removes persistent Bootstrap modal backdrops 
     * that might remain in the DOM after a programmatic navigation.
     */
    useEffect(() => {       
        const modalElement = document.getElementsByClassName("modal-backdrop fade show")[0];
        if(modalElement && modalElement.classList.contains('show')){
            modalElement.classList.remove('modal-backdrop', 'show');
            modalElement.classList.add('modal');
        }
    }, []);

    const navigate = useNavigate();

    /**
     * Contextual Logic Effect
     * Parses the navigation state to determine which message to display
     * based on the HTTP method (POST, PUT, DELETE) and the resource type.
     */
    useEffect(() => {
    if(location.state && location.state.origin){  
        // Logic for USER resource              
        if(rawOrigin.toLowerCase().includes('users')){
            if(location.state.method === 'delete'){
                setConfirmMessage("L'utilisateur a été supprimé avec succès.");
            }else if(location.state.method.toLowerCase() === 'put'){
                setConfirmMessage("L'utilisateur a été modifié avec succès.");
            }
            else{
                setConfirmMessage("L'utilisateur a été ajouté avec succès.");
            }
            setOrigin('utilisateurs');
            setReturnOrigin('users');

        // Logic for CATWAY resource
        }else if(rawOrigin.toLowerCase().includes('catways')){
            if(location.state.method === 'delete'){
                setConfirmMessage("Le catway a été supprimé avec succès.");
            }else if(location.state.method.toLowerCase() === 'put'){
                setConfirmMessage("Le catway a été modifié avec succès.");
            }
            else{
                setConfirmMessage("Le catway a été ajouté avec succès.");
            }
            setOrigin('catways');
            setReturnOrigin('catways');

        // Logic for RESERVATION resource
        }else if(rawOrigin.toLowerCase().includes('reservations')){
            if(location.state.method === 'delete'){
                setConfirmMessage("La réservation a été supprimée avec succès.");
            }else if(location.state.method.toLowerCase() === 'put'){
                setConfirmMessage("La réservation a été modifiée avec succès.");
            }
            else{
                setConfirmMessage("La réservation a été ajoutée avec succès.");
            }
            setOrigin('reservations');
            setReturnOrigin('reservations');
        }
    }else{
        console.error('No origin provided in location state');
    }
    }, [location.state, rawOrigin]);

    /**
     * Automatic Redirection
     * Uses a timer to redirect the user back to the relevant dashboard 
     * after a short delay (2 seconds).
     */
    setTimeout(() => {                    
            navigate(`/${returnOrigin}`);
        }, 2000);

    return(
        <div>
            <h1>Confirmation</h1>
            {/* Dynamic success message */}
            <p>{confirmMessage}</p>
            <p>Vous allez être redirigé vers la page des {origin} dans quelques secondes...</p>

            {/* Visual feedback (Bootstrap Spinner) during the redirection delay */}
            <div class="container-fluid fs-3">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Confirm;
