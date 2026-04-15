import '../style/bootstrap.min.css';
import '../style/style.css';
import Modal from './Modal';
import { useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';

/**
 * DisplayCard Component
 * A polymorphic card used to display and edit Users, Reservations, or Catways.
 * It dynamically configures its fields and API endpoints based on the current URL path.
 */
const DisplayCard = (props) => {   
    
    const location = useLocation();
    // Local state to track the specific reservation ID if applicable
    const [reservationId, setReservationId] = useState(null);

    // Configuration variables initialized for dynamic assignment
    var modalId = "";
    var fields = [];
    var pathname = "";   
   
    /**
     * Effect hook to synchronize the reservation ID state 
     * whenever the URL or the provided ID prop changes.
     */
    useEffect(() => {
    if(location.pathname.toLowerCase().includes('reservations')){
        // Used to target a specific reservation for update/delete actions
        setReservationId(props.idReservation || null);
        console.log('Reservation ID set to:', props.idReservation);
    }}, [location.pathname, props.idReservation]);
    
    /**
     * DYNAMIC CONFIGURATION LOGIC
     * The component determines the modal ID, API endpoint (pathname), 
     * and editable fields based on the current route.
     */

    // Case 1: USER management section
    if(location.pathname.toLowerCase().includes('users')){
        modalId =  `editUserModal-${props.text2}`;
        pathname = "http://localhost:3000/Users/" + props.text2;
        
        fields = [
            { name: 'userName', label: 'Nom', type: 'text', value: props.text1 },
            { name: 'email', label: 'Email', type: 'email', value: props.text2 },
            { name: 'password', label: 'Mot de passe', type: 'password' }
        ];
    
    // Case 2: RESERVATION management section
    }else if(location.pathname.toLowerCase().includes(`reservations`)){
        modalId = `editReservationModal-${props.idReservation}`;
        pathname = "http://localhost:3000/catways/" + props.text1 + "/reservations/" + props.idReservation;
        
        fields = [
            { name: 'catwayNumber', label: 'Numéro de catway', type: 'text', value: props.text1 },
            { name: 'clientName', label: 'Nom du client', type: 'text', value: props.text2 },
            { name: 'boatName', label: 'Nom du bâteau', type: 'text', value: props.text3 },
            { name: 'startDate', label: 'Début de réservation', type: 'date', value: props.text4 },
            { name: 'endDate', label: 'Fin de réservation', type: 'date', value: props.text5 }
        ];
        
    // Case 3: CATWAY management section
    }else if(location.pathname.toLowerCase().includes('catways')){
        modalId = `editCatwayModal-${props.text1}`;
        pathname = "http://localhost:3000/catways/" + props.text1;
        
        fields = [
            // catwayNumber and catwayType are read-only during update, only catwayState is editable
            { name: 'catwayNumber', label: 'Numéro de catway', type: 'text', value: props.text1, disabledInput: "disabled" },
            { name: 'catwayType', label: 'Type de catway', type: 'text', value: props.text2, disabledInput: "disabled" },
            { name: 'catwayState', label: 'Etat du catway', type: 'text', value: props.text3 }
        ];
    }else{
        console.error('Unknown path for DisplayCard:', location.pathname);

        fields = [];
    };
    
    

    return(
       <div className="card shadow-lg min-h-200 mx-auto border-2 mt-5" id='userCard'>            
            <div className="card-body text-center">
                {/* Standard grid layout for common resource properties */}
                <div className="row">
                    <div className={props.col1}>                        
                        <img src={props.icon1} className='cardIcon mb-2' alt={props.iconAlt1}/>
                        <p className="card-title">{props.text1}</p>
                    </div>                    
                    <div className={props.col1}>
                        <img src={props.icon2} className='cardIcon mb-2' alt={props.iconAlt2} />
                        <p className={"card-text" + props.capitalize}>{props.text2}</p>
                    </div> 
                    {/* Conditional display for the third column (used for catwayState / boatName) */}
                    <div className={props.display}> 
                        <img src={props.icon3} className={'cardIcon mb-2 '} alt={props.iconAlt3} />
                        <p className="card-text">{props.text3}</p>
                    </div>  
                </div>
                {/* Secondary row specifically for Reservation date ranges */}
                <div className={props.rowDisplay}>                     
                    <div className='col-12'>
                        <img src={props.icon4} className={props.secondRowIcon} alt={props.iconAlt4} />
                    </div>                    
                    <div className={props.col2}>                            
                        <p className="card-text">Du : <span>{props.text4}</span></p>
                    </div> 
                    <div className={props.col2}>                            
                        <p className="card-text">Au : <span>{props.text5}</span></p>
                    </div>                     
                </div>        
            </div>
            {/* Modal integration for the Update/Delete action */}
            <div className='card-footer'>
                <Modal
                    modalId = {modalId}
                    textPosition= "text-center row justify-content-evenly"
                    title = "Modifier"
                    margin = ""
                    action = {pathname}
                    method = "PUT"
                    fields = {fields}
                    noDisplay = ""                     
                    user = {props.text2}
                    idReservation = {props.idReservation}
                    catwayNumber = {props.text1}
                />  
            </div>
        </div> 
    )
    
}

export default DisplayCard;
