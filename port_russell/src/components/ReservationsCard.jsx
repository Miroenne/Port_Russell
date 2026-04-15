import '../style/bootstrap.min.css';
import '../style/style.css';
import Modal from './Modal';
import { data, useLocation } from 'react-router-dom';
import {useState, useEffect, use} from 'react';

/**
 * ReservationsCard Component
 * Displays specific details for a reservation and provides an entry point 
 * for modification via a Modal component.
 */
const ReservationsCard = (props) => {   
    
    const location = useLocation();
    // Local state to store the unique identifier of the reservation
    const [reservationId, setReservationId] = useState(null);

    // Configuration variables for the modal and form fields
    var modalId = "";
    
    /**
     * Effect Hook
     * Synchronizes the internal reservationId state whenever the route 
     * or the idReservation prop changes.
     */
    useEffect(() => {
    if(location.pathname.toLowerCase().includes('reservations')){
        setReservationId(props.idReservation || null);
        console.log('Reservation ID set to:', props.idReservation);
    }}, [location.pathname, props.idReservation]);   
   
    /**
     * Form Field Configuration
     * Defines the structure of the fields to be rendered inside the Modal.
     * Maps props to field values for pre-filling the form.
     */
    const fields = [
        { name: 'userName', label: 'Nom', type: 'text', value: props.text1 },
        { name: 'email', label: 'Email', type: 'email', value: props.text2 },
        { name: 'password', label: 'Mot de passe', type: 'password' }
    ];

    return(
       <div className="card shadow-lg min-h-200 mx-auto border-2 mt-5" id='userCard'>            
            <div className="card-body text-center">
                {/* Main information row (e.g., Catway number, Client name) */}
                <div className="row">
                    <div className={props.col1}>
                        <img src={props.icon1} className='cardIcon mb-2' alt={props.iconAlt1}/>
                        <p className="card-title">{props.text1}</p>
                    </div>                    
                    <div className={props.col1}>
                        <img src={props.icon2} className='cardIcon mb-2' alt={props.iconAlt2} />
                        <p className="card-text">{props.text2}</p>
                    </div> 
                    {/* Conditional column: rendered only if props.display provides valid CSS classes */}
                    <div className={props.display}> 
                        <img src={props.icon3} className={props.display} alt={props.iconAlt3} />
                        <p className="card-text">{props.text3}</p>
                    </div>  
                </div>

                {/* Secondary row for additional details (e.g., Dates) */}
                <div className={props.rowDisplay}>                     
                    <div className='col-12'>
                        <img src={props.icon4} className={props.secondRowIcon} alt={props.iconAlt4} />
                    </div>                    
                    <div className={props.col2}>                            
                        <p className="card-text">{props.text4}</p>
                    </div> 
                    <div className={props.col2}>                            
                        <p className="card-text">{props.text5}</p>
                    </div>                     
                </div>        
            </div>

            {/* Card Action Area: Integration with the Modal component for updates */}
            <div className='card-footer'>
                <Modal
                    modalId = {modalId}
                    textPosition= "text-center row justify-content-evenly"
                    title = "Modifier"
                    margin = ""
                    action = ""
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

export default ReservationsCard;