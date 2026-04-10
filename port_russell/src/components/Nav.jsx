import {NavLink} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import '../style/bootstrap.min.css';
import '../style/style.css';

const MyLink = (props) => {
    return(
        <NavLink className={({isActive}) => isActive? "nav-link fs-6 fw-bold text-uppercase active" : "nav-link fs-6 text-uppercase"} to={"/" + props.path}>{props.label}</NavLink>
    )
}

const Nav = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {    
    try{
        await fetch('http://localhost:3000/users/logout', {
            method: "GET",
            credentials: 'include'
        });
        
        sessionStorage.removeItem('user');

        navigate('/');
    }catch(error){
        console.error('error_during_logout', error);
    }
}
    return(
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fs-5" id='nav' data-bs-theme="light">
                <div className="container-fluid pe-4 ps-5">                    
                    <div>
                        <NavLink className="navbar-brand fs-3 fw-bold mt-0" to="home">Port Russell</NavLink>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon mt-1 mb-1 me-0"></span>
                    </button>  
                    <div className="d-flex ps-0 container-lg me-0">                                               
                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav ">
                                <li className="nav-item">
                                    <MyLink label="Home" path="Home"/>
                                </li>
                                <li className="nav-item">
                                    <MyLink label="Reservation" path="Services"/>
                                </li>
                                <li className="nav-item">                                    
                                    <MyLink label="Catways" path="Achievements"/>
                                </li>
                                <li className="nav-item">
                                    <MyLink label="Utilisateurs" path="Users"/>
                                </li>
                                <li className="nav-item">
                                    <MyLink label="Docs" path="Readme"/>
                                </li>
                                <li className='nav-item'>
                                    <button className="logout-btn" type='button' onClick={handleLogout}>Déconnexion</button>
                                </li>
                            </ul>
                        </div>
                    </div>   
                                                         
                </div>     
            </nav>
        </header>
    )
}

export default Nav;