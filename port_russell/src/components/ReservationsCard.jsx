import '../style/bootstrap.min.css';
import '../style/style.css';
import Modal from './Modal';
import { data, useLocation } from 'react-router-dom';
import {useState, useEffect, use} from 'react';


const ReservationsCard = (props) => {   
    
    const location = useLocation();
    const [reservationId, setReservationId] = useState(null);
    var modalId = "";
    var fields = [];
    var pathname = "";
   
    useEffect(() => {
    if(location.pathname.toLowerCase().includes('reservations')){
        setReservationId(props.idReservation || null);
        console.log('Reservation ID set to:', props.idReservation);
    }}, [location.pathname, props.idReservation]);
    
    /*if(location.pathname.toLowerCase().includes('users')){
        modalId = 'editUserModal';
        pathname = location.pathname + props.text2;
        
        
    }else if(location.pathname.toLowerCase().includes(`reservations`)){
        modalId = `updateReservations`;

        const reservationFields = [
            { name: 'catwayNumber', label: 'Numéro de catway', type: 'text', value: props.text1 },
            { name: 'clientName', label: 'Nom du client', type: 'text', value: props.text2 },
            { name: 'boatName', label: 'Nom du bâteau', type: 'text', value: props.text3 },
            { name: 'startDate', label: 'Début de réservation', type: 'date', value: props.text4 },
            { name: 'endDate', label: 'Fin de réservation', type: 'date', value: props.text5 }
        ];
        fields = reservationFields;
    }; */
    
    const userFields = [
            { name: 'userName', label: 'Nom', type: 'text', value: props.text1 },
            { name: 'email', label: 'Email', type: 'email', value: props.text2 },
            { name: 'password', label: 'Mot de passe', type: 'password' }
        ];

    return(
       <div className="card shadow-lg min-h-200 mx-auto border-2 mt-5" id='userCard'>            
            <div className="card-body text-center">
                <div className="row">
                    <div className={props.col1}>
                        <img src={props.icon1} className='cardIcon mb-2' alt={props.iconAlt1}/>
                        <p className="card-title">{props.text1}</p>
                    </div>                    
                    <div className={props.col1}>
                        <img src={props.icon2} className='cardIcon mb-2' alt={props.iconAlt2} />
                        <p className="card-text">{props.text2}</p>
                    </div> 
                    {/*définir les classes "col et mb-2" dans "props.display" si élément affiché*/}
                    <div className={props.display}> 
                        <img src={props.icon3} className={props.display} alt={props.iconAlt3} />
                        <p className="card-text">{props.text3}</p>
                    </div>  
                </div>
                <div className={props.rowDisplay}> 
                    {/*définir les classes "col et mb-2" dans "props.display" si élément affiché*/}
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
            <div className='card-footer'>
                <Modal
                    modalId = {modalId}
                    textPosition= "text-center row justify-content-evenly"
                    title = "Modifier"
                    margin = ""
                    action = ""
                    method = "PUT"
                    fields = {userFields}
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