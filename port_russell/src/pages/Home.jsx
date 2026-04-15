import {useEffect, useState, useRef} from 'react';
import HomeCard from '../components/HomeCard';

/**
 * Home Component
 * Serves as the main dashboard, displaying current user info 
 * and a summary table of all reservations across all catways.
 */
const Home = () => {

    // State to store the combined list of reservations from all catways
    const [allReservations, setAllReservations] = useState([]);
    
    /**
     * Ref used as a guard to prevent double execution of the useEffect hook.
     * Common in React Strict Mode (Development) where hooks run twice.
     */
    const hasFetchedRef = useRef(false);
    
    useEffect(() => {

        // Guard clause: stop execution if the fetch has already been initiated
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        /**
         * Orchestrates multiple API calls to aggregate data.
         * Logic: Fetch catways first, then loop to fetch reservations for each.
         */
        const fetchEverything = async () => {
            try{
                // 1) Fetch the master list of all catways
                const resReservations = await fetch('http://localhost:3000/catways/');
                const catways = await resReservations.json();
                
                // 2) Iterate through each catway to retrieve its specific nested reservations
                for (let i = 0; i < catways.length; i++){
                    const catway = catways[i];
                    const resReservations = await fetch(`http://localhost:3000/catways/${catway.catwayNumber}/reservations/`);
                    const reservations = await resReservations.json(); 

                    // Flatten the array to ensure data consistency                   
                    const flatReservations = reservations.flat();                    
                    setAllReservations(flatReservations);                    
                }     
            
            }catch(error){
                console.error('error_during_group_load', error);
            }
        };
        
        fetchEverything();
    }, []);
        

    return(
        <main>  
            {/* User profile summary card */}      
            <HomeCard/>  

            {/* Data Table Section: Displays ongoing reservations */}      
            <div class="container-fluid row mt-5 p-2 text-center justify-content-center">
                <table class="mx-auto">
                    <caption class="text-decoration-underline">
                        Réservations en cours
                    </caption>
                    <thead>
                        <tr>
                            <th>Numéro catway</th>                    
                            <th>Nom</th>
                            <th>Nom bâteau</th>
                            <th>Début de réservation</th>
                            <th>Fin de réservation</th>
                        </tr>                    
                    </thead>
                    <tbody>
                        {/* Iterate and render a row for each reservation found */}
                        {allReservations.map(reservation => (
                            <tr key={reservation.catwayNumber}>
                                <td>{reservation.catwayNumber}</td>
                                <td>{reservation.clientName}</td>
                                <td>{reservation.boatName}</td>
                                <td>{reservation.startDate}</td>
                                <td>{reservation.endDate}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Numéro catway</th>    
                            <th>Nom</th>
                            <th>Nom bâteau</th>
                            <th>Début de réservation</th>
                            <th>Fin de réservation</th>
                        </tr>  
                    </tfoot>
                </table>
            </div>  
        </main>
    )
}

export default Home;
