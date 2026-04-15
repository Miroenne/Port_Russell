import '../style/bootstrap.min.css';
import '../style/style.css';
import userIcon from '../assets/img/user.png';
import emailIcon from '../assets/img/email.png';
import calendarIcon from '../assets/img/calendrier.png';

/**
 * HomeCard Component
 * Displays current session user information and the current date.
 * Acts as a dashboard summary for the logged-in user.
 */
const HomeCard = () => {
    // Initialize current date object
    const now = new Date();

    /**
     * Date Formatting
     * Formats the date to a long French readable string.
     * Example: "mardi 14 avril 2026"
     */
    const formatted = now.toLocaleDateString('fr-Fr',{
        weekday: 'long',
        day: 'numeric',
        month: "long",
        year: "numeric"
    })
    const date = formatted;   
   
    /**
     * Session Recovery
     * Retrieves the user object from sessionStorage.
     * Parsing is required as sessionStorage stores data as strings.
     */
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    return(
       <div class="card shadow-lg mx-auto border-2 mt-5" id='homeCard'>
            {/* Primary header title of the card */}
            <div className="card-header">
                <p>Utilisateur connecté</p>
            </div>
            <div class="card-body row text-center">
                {/* User Name Section with Fallback for unknown users */}
                <div className='col-6'>
                    <img src={userIcon} className='cardIcon' alt="user icon"/>
                    <p class="card-title">{user ? user.userName : 'Utilisateur inconnu'}</p>
                </div> 

                {/* User Email Section */}                   
                <div className='col-6'>
                    <img src={emailIcon} className='cardIcon' alt="email icon" />
                    <p class="card-text">{user ? user.email : ''} </p>
                </div>           
            </div>

            {/* Footer section displaying the localized current date */}
            <div className="card-footer">
                <img src={calendarIcon} className='cardIcon' alt="calendar icon" />
                <p className='text-capitalize'>{date}</p>
            </div>
        </div> 
    )
    
}

export default HomeCard;