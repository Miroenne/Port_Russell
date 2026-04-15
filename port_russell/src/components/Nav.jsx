import {NavLink} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import '../style/bootstrap.min.css';
import '../style/style.css';

/**
 * MyLink Component
 * A wrapper for NavLink that dynamically applies styles.
 * It uses the 'isActive' state to highlight the current route.
 */
const MyLink = (props) => {
    return(
        <NavLink 
            // Conditional styling based on the active route state
            className={({isActive}) => 
            isActive? "nav-link fs-6 fw-bold text-uppercase active" : "nav-link fs-6 text-uppercase"
        } 
            to={"/" + props.path}
            target={props.target}
        >
            {props.label}
        </NavLink>
    )
}

/**
 * Nav Component
 * The main navigation bar of the application.
 * Handles the application layout, routing links, and logout logic.
 */
const Nav = () => {

    const navigate = useNavigate();

    /**
     * Terminate the user session.
     * Calls the backend logout endpoint and clears local session storage.
     */
    const handleLogout = async () => {    
    try{
        // Server-side logout (clears the HTTP-only cookie)
        await fetch('http://localhost:3000/users/logout', {
            method: "GET",
            credentials: 'include' // Required to send the JWT cookie to the server
        });
        
        // Client-side cleanup: remove user data from storage
        sessionStorage.removeItem('user');

        // Redirect to login page
        navigate('/');
    }catch(error){
        console.error('error_during_logout', error);
    }
}
    return(
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fs-5" id='nav' data-bs-theme="light">
                <div className="container-fluid pe-4 ps-5"> 
                    {/* Brand / Logo linking to the Home dashboard */}                   
                    <div>
                        <NavLink className="navbar-brand fs-3 fw-bold mt-0" to="home">Port Russell</NavLink>
                    </div>

                    {/* Mobile Menu Toggler (Hamburger menu for small screens) */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon mt-1 mb-1 me-0"></span>
                    </button>  

                    <div className="d-flex ps-0 container-lg me-0">                                               
                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav ">
                                {/* Navigation links using the custom MyLink component */}
                                <li className="nav-item">
                                    <MyLink label="Home" path="Home"/>
                                </li>
                                <li className="nav-item">
                                    <MyLink label="Reservation" path="Reservations"/>
                                </li>
                                <li className="nav-item">                                    
                                    <MyLink label="Catways" path="Catways"/>
                                </li>
                                <li className="nav-item">
                                    <MyLink label="Utilisateurs" path="Users"/>
                                </li>
                                <li className="nav-item">
                                    <MyLink label="Docs" target="_blank" rel="noopener noreferrer" path="Readme"/>
                                </li>
                                
                                {/* Logout Action */}
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