import '../style/bootstrap.min.css';
import '../style/style.css';
import userIcon from '../assets/img/user.png';
import emailIcon from '../assets/img/email.png';
import calendarIcon from '../assets/img/calendrier.png';

const HomeCard = () => {
    const now = new Date();

    const formatted = now.toLocaleDateString('fr-Fr',{
        weekday: 'long',
        day: 'numeric',
        month: "long",
        year: "numeric"
    })
    const date = formatted;   
   
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    return(
       <div class="card shadow-lg mx-auto border-2 mt-5" id='homeCard'>
            <div className="card-header">
                <p>Utilisateur connecté</p>
            </div>
            <div class="card-body row text-center">
                <div className='col-6'>
                    <img src={userIcon} className='cardIcon' alt="user icon"/>
                    <p class="card-title">{user ? user.userName : 'Utilisateur inconnu'}</p>
                </div>                    
                <div className='col-6'>
                    <img src={emailIcon} className='cardIcon' alt="email icon" />
                    <p class="card-text">{user ? user.email : ''} </p>
                </div>           
            </div>
            <div className="card-footer">
                <img src={calendarIcon} className='cardIcon' alt="calendar icon" />
                <p className='text-capitalize'>{date}</p>
            </div>
        </div> 
    )
    
}

export default HomeCard;