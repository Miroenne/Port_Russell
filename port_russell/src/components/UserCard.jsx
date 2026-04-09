import '../style/bootstrap.min.css';
import '../style/style.css';
import userIcon from '../assets/img/user.png';
import emailIcon from '../assets/img/email.png';


const UserCard = () => {   

    return(
       <div class="card shadow-lg mx-auto border-2 mt-5" id='userCard'>            
            <div class="card-body row text-center">
                <div className='col-6'>
                    <img src={userIcon} className='homeCardIcon' alt="user icon"/>
                    <p class="card-title"></p>
                </div>                    
                <div className='col-6'>
                    <img src={emailIcon} className='homeCardIcon' alt="email icon" />
                    <p class="card-text"></p>
                </div>           
            </div>
            
        </div> 
    )
    
}

export default UserCard;

