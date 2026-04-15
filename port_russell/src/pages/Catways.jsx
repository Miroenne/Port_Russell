import catwayIcon from '../assets/img/catway.png';
import stateIcon from '../assets/img/state.png';
import typeIcon from '../assets/img/type.png';
import {useEffect, useState} from 'react';
import DisplayCard from '../components/DisplayCard';
import Modal from '../components/Modal';

/**
 * Catways Component
 * Manages the fetching, sorting, and display of all catways.
 * Includes a modal for adding new catway entries.
 */
const Catways = () => {

    // State to store the list of catways retrieved from the database
    const [catways, setCatways] = useState([]);    

    /**
     * Data Fetching
     * Runs on component mount to retrieve the catway list from the API.
     */
    useEffect(() => {
        const fetchCatways = async () => {
            try{
                const resCatways = await fetch('http://localhost:3000/catways/', {
                    credentials: 'include', // Ensures the JWT cookie is sent for authentication
                    cache: 'no-store' // Prevents stale data by forcing a fresh fetch
                });
                const data = await resCatways.json();
                
                // Validate that the response is an array before processing
                if(Array.isArray(data)) {
                    /**
                     * Data Sorting logic
                     * Orders the catways numerically by their catwayNumber.
                     */
                    const sortedData = [...data].sort((a,b) => {
                        if(a.catwayNumber < b.catwayNumber) return -1;
                        if(b.catwayNumber > a.catwayNumber) return 1;
                        return 0;
                    });
                    setCatways(sortedData);                                                                  
                }else{
                    console.error("La route /catways n'a pas renvoyé un tableau", data);
                    setCatways([]);
                }

            }catch(error){
                console.error('error_during_catways_load');
                setCatways([]);
            }
        };

        fetchCatways();
    }, []);

    /**
     * Configuration for the 'Add Catway' form fields.
     */
    const catwayFields = [
        { name: 'catwayNumber', label: 'Numéro de catway', type: 'text'},
        {name: 'catwayType', label: 'Type de catway', type: 'text'},
        {name: 'catwayState', label: 'Etat du catway', type: 'text'}       
        
    ];
        
    

    return(
        <main>
            {/* Modal component configured for CREATING a new catway (POST method) */}
            <Modal 
                modalId = "addCatwayModal"
                textPosition= "text-center row justify-content-start"
                title = "Ajouter un catway"
                margin = "mt-5 ms-4_5"
                action = "http://localhost:3000/catways/"
                method = "POST"
                fields = {catwayFields}                         
                noDisplay = "d-none"              
            />
            <div className='container-fluid mx-0 text-center'>
                <div className='row justify-content-evenly'>
                    {/* Iterate through the catways state to render a card for each entry */}
                    {catways.map((catway) => (                    
                        <div className='col-5' key={catway.catwayNumber}>
                            <DisplayCard 
                            col1="col-6"
                            icon1={catwayIcon} iconAlt1="user_icon" text1={catway.catwayNumber} 
                            icon2={typeIcon} iconAlt2="type_icon" text2={catway.catwayType}
                            icon3={stateIcon} iconAlt3="state_icon" text3={catway.catwayState}
                            rowDisplay='d-none' display='mt-3' capitalize=' text-capitalize'
                            />
                        </div>
                                                
                    ))}
                </div>  
                
            </div>
        </main>
    );

}

export default Catways;