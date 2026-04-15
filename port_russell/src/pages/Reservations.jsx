import userIcon from '../assets/img/user.png';
import catwayIcon from '../assets/img/catway.png';
import calendarIcon from '../assets/img/calendrier.png';
import boatIcon from '../assets/img/boat.png';
import {useEffect, useState, useRef} from 'react';
import Modal from '../components/Modal';
import DisplayCard from '../components/DisplayCard';

/**
 * Reservations Component
 * Aggregates and displays reservations across all available catways.
 * Includes a creation modal with dynamic routing logic.
 */
const Reservations = (props) => {

    // State to store all reservations collected from various catway endpoints
    const [allReservations, setAllReservations] = useState([]);
        
    /**
     * Execution Guard (useRef)
     * Prevents the effect from firing twice in development mode (Strict Mode),
     * ensuring only one data-loading cycle occurs.
     */
    const hasFetchedRef = useRef(false);
    
    useEffect(() => {

        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        /**
         * Master-Detail Fetching Logic
         * First retrieves all catways, then iterates to fetch specific reservations 
         * for each individual catway.
         */
        const fetchEverything = async () => {
            try{
                // 1) Fetch the master list of catways
                const resReservations = await fetch('http://localhost:3000/catways/');
                const catways = await resReservations.json();
                
                // 2) Sequentially fetch reservations for each catway found
                for (let i = 0; i < catways.length; i++){
                    const catway = catways[i];
                    const resReservations = await fetch(`http://localhost:3000/catways/${catway.catwayNumber}/reservations/`);
                    const reservations = await resReservations.json();  
                    
                    // Flatten the response and update the state
                    const flatReservations = reservations.flat();                    
                    setAllReservations(flatReservations);
                }     
            
            }catch(error){
                console.error('error_during_group_load', error);
            }
        };
        
        fetchEverything();
    }, []);

    /**
     * Field definitions for the 'Add Reservation' form.
     */
    const reservationFields = [
        { name: 'catwayNumber', label: 'Numéro de catway', type: 'text'},
        { name: 'clientName', label: 'Nom', type: 'text' },
        { name: 'boatName', label: 'Nom du bâteau', type: 'text' },
        { name: 'startDate', label: 'Début de réservation', type: 'date' },
        { name: 'endDate', label: 'Fin de réservation', type: 'date' }
    ];
        


    return(
        <main>
            {/* Creation Modal 
                'action' is passed as a function to dynamically build the URL 
                based on the catwayNumber entered by the user in the form.
            */}
            <Modal 
                modalId = "addReservationModal"
                textPosition= "text-center row justify-content-start"
                title = "Ajouter une réservation"
                margin = "mt-5 ms-4_5"
                action = {(data) => {
                    // Sanitization: trim input to prevent URL formatting issues
                    const catway = data.catwayNumber?.trim();
                    // Returns the specific API endpoint for that catway's reservations
                    return catway ? 
                    `http://localhost:3000/catways/${encodeURIComponent(catway)}/reservations/` 
                    : null;
                }}
                method = "POST"
                fields = {reservationFields}                         
                noDisplay = "d-none" 

            />
            <div className='container-fluid mx-0 text-center'>
                <div className='row justify-content-evenly'>
                    {/* Render a DisplayCard for each reservation in the state */}
                    {allReservations.map((reservation) => (                    
                        <div className='col-5' key={reservation.userName}>
                            <DisplayCard 
                            idReservation={reservation._id}
                            col1="col-4"
                            col2="col-4"
                            icon1={catwayIcon} iconAlt1="user_icon" text1={reservation.catwayNumber} 
                            icon2={userIcon} iconAlt2="email_icon" text2={reservation.clientName}
                            icon3={boatIcon} iconAlt3="boat_icon" text3={reservation.boatName} 
                            icon4={calendarIcon} iconAlt4="calendar_icon" text4={new Date(reservation.startDate).toISOString().split('T')[0]}
                            text5={new Date(reservation.endDate).toISOString().split('T')[0]} display="cardIcon col-4" rowDisplay="row justify-content-evenly pt-2 border-top-3 " secondRowIcon="cardIcon"
                            />
                        </div>
                                                
                    ))}
                </div>  
                
            </div>
        </main>
    );

}

export default Reservations;
