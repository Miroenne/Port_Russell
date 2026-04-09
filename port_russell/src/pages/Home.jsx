import {useEffect, useState} from 'react';

const Home = () => {

    const [allReservations, setAllReservations] = useState([]);
    
    useEffect(() => {
        const fetchEverything = async () => {
            try{
                const resReservations = await fetch('http://localhost:3000/catways/');
                const catways = await resReservations.json();

                const reservationPromises = catways.map(catway => 
                    fetch('http://localhost:3000/catways/${catway.catwayNumber}/reservations/')
                    .then(res => res.json())
                );

                const results = await Promise.all(reservationPromises);
                const flatReservations = results.flat();

                setAllReservations(flatReservations);
            }catch(error){
                console.error('error_while_group_loading', error);
            }
        };
        
        fetchEverything();
    }, []);
        

    return(
        <main>
        <div class="container-fluid row py-2 justify-content-evenly">
                       
        </div> 
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