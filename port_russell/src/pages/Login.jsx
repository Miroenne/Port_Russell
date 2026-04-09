import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';


function Login() {
    
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/users/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if (response.status === 200){
            navigate('/Home');
        }else{
            alert('Identifiant ou mot de passe incorrect');
        }
    };


    return(
        <main>
            <div class="container mb-5 fs-4 text-center">
                <p>Bienvenue sur l'application du Port de Plaisance Russell.</p>
                <p>Cette application vous permet de gérer les catways, les réservations ainsi que les utilisateurs.</p>
            </div>
            <div class="container px-0 text-center">
                <form class="w-50 min-vh-50 shadow-lg border border-3 rounded-3 shadow align-content-center mx-auto"
                   onSubmit={handleLogin} action="http://localhost:3000/users/login" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="col-6 mx-auto">
                        <label for="email" class="visually-hidden">Email</label>
                        <input type="text" class="form-control" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Adresse email"></input>
                    </div>
                    <div class="col-6 mx-auto my-4">
                        <label for="password" class="visually-hidden">Password</label>
                        <input type="password" class="form-control" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe"></input>
                    </div>
                    <div class="col-4 mx-auto">
                        <button type="submit" class="btn btn-primary mb-3">Connexion</button>
                    </div>
                    <div class="container pt-3 text-end">
                        <NavLink id='readme' to='Readme'>Docs</NavLink>
                    </div>
                </form>
                
            </div>
            
        </main>
    );
}

export default Login;