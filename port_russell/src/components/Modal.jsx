import '../style/bootstrap.min.css';
import '../style/style.css';
import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const Modal = (props) => {

    const [formData, setFormData] = useState(props.initialValues || {});

    useEffect(() => {
        setFormData(props.initialValues || {});
    }, [props.initialValues, props.modalId]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const actionUrl = 
        typeof props.action === 'function' ? props.action(formData) : props.action;

        try{
            const response = await fetch(actionUrl, {
                method: props.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData)
            });

            if(response.status === 200 || response.status === 201){                
                navigate('/Confirm', {state: {method : props.method, origin: location.pathname}});               
            }else if(response.status >= 400 && response.status < 500){
                const errorData = await response.json();
                console.log(errorData.previousStart, errorData.previousEnd, errorData.newStart, errorData.newEnd);
                console.error('Validation error:', errorData);
                alert('Erreur de validation: ' + (errorData.message || 'Données invalides'));
            }
        }catch(error){
            console.error('error_during_form_submission', error);
        }
    }

    const storedUser = sessionStorage.getItem('user');    
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleDelete = async () => {

        if(location.pathname.toLowerCase().includes('users')){
            if(window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")){
                try{
                    const response = await fetch(`http://localhost:3000/users/${props.user}`, {
                        method: 'DELETE',
                        credentials: 'include'
                    });

                    if(response.status === 204){
                        if(user && user.email === props.user){
                            sessionStorage.removeItem('user');
                            navigate('/');
                        }
                        console.log(props.user + 'User deleted successfully');
                        navigate('/Confirm', {state: {method: 'delete', origin: location.pathname}});              
                    } else {
                        console.error('Failed to delete user');
                    }
                } catch (error) {
                    console.error('Error occurred while deleting user:', error);

                }
            }
        }
        else if(location.pathname.toLocaleLowerCase().includes('reservations')){
            if(window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")){
                try{
                    const response = await fetch(`http://localhost:3000/catways/${props.catwayNumber}/reservations/${props.idReservation}`, {
                        method: 'DELETE',
                        credentials: 'include'
                    });

                    if(response.status === 204){
                        console.log('Reservation deleted successfully');
                        navigate('/Confirm', {state: {method: 'delete', origin: location.pathname}});              
                    } else {
                        console.error('Failed to delete reservation');
                    }
                } catch (error) {
                    console.error('Error occurred while deleting reservation:', error);

                }
            }
        }

    }

        
        
    

    return(
        <div>
            {/*Button trigger modal */}
            <div className={props.textPosition}>
                <button type="button" className={"btn btn-success w-auto col-6 " + props.margin} data-bs-toggle="modal" data-bs-target={"#" + props.modalId}>
                   {props.title}
                </button>
                <button className={"btn btn-danger w-auto d-inline col-6 " + props.noDisplay} onClick={handleDelete}>
                    Supprimer
                </button>                
            </div>


            {/* Modal */}
            <div className="fade modal " id={props.modalId} name='myModal' tabIndex="-1" aria-labelledby={props.modalId + "Label"} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={props.modalId + "Label"}>{props.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='' onSubmit={handleSubmit}>     
                                <div className='container'>                                    
                                        {props.fields?.map((field) =>                                     
                                        <div className='mb-3 text-start' key={field.name}>
                                            <label className='form-label' htmlFor={field.name}>{field.label}</label>
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                value={formData[field.name] ?? field.value ?? ''}
                                                onChange={handleChange}
                                                disabled={field.disabledInput}
                                                className='form-control'
                                            ></input>
                                        </div>    
                                    )}                                    
                                </div>
                                <div className="text-center pt-3">
                                    <input type="submit" className="btn btn-primary me-5" value="Valider"></input>  
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Fermer</button> 
                                </div>                                                         
                            </form>
                        </div>               
                    </div>            
                </div>
            </div>
        </div>   
    );
}

export default Modal;