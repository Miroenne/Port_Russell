import '../style/bootstrap.min.css';
import '../style/style.css';
import {useNavigate} from 'react-router-dom';

const Confirm = () => {
    
    const navigate = useNavigate();

    setTimeout(() => {        
        navigate('/users');
    }, 3000);

    return(
        <div>
            <h1>Confirmation</h1>
            <p>Votre demande a été soumise avec succès.</p>
        </div>
    )
}

export default Confirm;