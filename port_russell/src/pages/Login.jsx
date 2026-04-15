import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

/**
 * Login Component
 * Manages user authentication by capturing credentials and communicating with the backend API.
 */
const Login = () => {
    
    // Local state for tracking input field values
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    // Hook to programmatically navigate after successful login
    const navigate = useNavigate();

    /**
     * Handle Login logic
     * Triggered on form submission. Performs an asynchronous POST request to the server.
     */
    const handleLogin = async (e) => {
        // Prevent the default browser form submission behavior (page reload)
        e.preventDefault();

        // Communication with the authentication endpoint
        const response = await fetch('http://localhost:3000/users/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // 'include' ensures that HTTP-only cookies (like JWT) are handled correctly
            credentials: 'include',
            body: JSON.stringify({email, password})
        });

        const data = await response.json();

        // If the server validates credentials (status 200)
        if (response.status === 200){
            /**
             * Session Persistence:
             * Stores non-sensitive user data (e.g., username, email) in sessionStorage 
             * to maintain context throughout the session.
             */
            sessionStorage.setItem('user', JSON.stringify(data.user));

            // Redirect user to the dashboard
            navigate('/Home');
        }else{
            // Basic UI feedback for failed authentication
            alert('Identifiant ou mot de passe incorrect');
        }
    };


    return(
        <main>
            {/* Welcome and Information Section */}
            <div class="container mb-5 fs-4 text-center">
                <p>Bienvenue sur l'application du Port de Plaisance Russell.</p>
                <p>Cette application vous permet de gérer les catways, les réservations ainsi que les utilisateurs.</p>
            </div>

            {/* Login Form Section */}
            <div class="container px-0 text-center">
                <form class="w-50 min-vh-50 shadow-lg border border-3 rounded-3 shadow align-content-center mx-auto"
                   onSubmit={handleLogin} action="http://localhost:3000/users/login" method="POST" enctype="application/x-www-form-urlencoded">

                    {/* Email Input */}
                    <div class="col-6 mx-auto">
                        <label for="email" class="visually-hidden">Email</label>
                        <input type="text" class="form-control" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Adresse email"></input>
                    </div>

                    {/* Password Input */}
                    <div class="col-6 mx-auto my-4">
                        <label for="password" class="visually-hidden">Password</label>
                        <input type="password" class="form-control" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe"></input>
                    </div>

                    {/* Submit Button */}
                    <div class="col-4 mx-auto">
                        <button type="submit" class="btn btn-primary mb-3">Connexion</button>
                    </div>

                    {/* Documentation Link */}
                    <div class="container pt-3 text-end">
                        <NavLink id='readme' to='/Readme' target='_blank' rel="noopener noreferrer">Docs</NavLink>
                    </div>
                </form>
                
            </div>
            
        </main>
    );
}

export default Login;