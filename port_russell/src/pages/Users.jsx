import userIcon from '../assets/img/user.png';
import emailIcon from '../assets/img/email.png';
import {useEffect, useState} from 'react';
import DisplayCard from '../components/DisplayCard';
import Modal from '../components/Modal';


const Users = () => {

    const [users, setUsers] = useState([]);    

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const resUsers = await fetch('http://localhost:3000/users/', {
                    credentials: 'include',
                    cache: 'no-store'
                });
                const data = await resUsers.json();
                
                    if(Array.isArray(data)) {
                        const sortedData = [...data].sort((a,b) => {
                            if(a.email.includes('@portrussell.com')) return -1;
                            if(b.email.includes('@portrussell.com')) return 1;
                            return 0;
                        });
                        setUsers(sortedData);                                                                  
                    }else{
                        console.error("La route /users n'a pas renvoyé un tableau", data);
                        setUsers([]);
                    }

            }catch(error){
                console.error('error_during_users_load');
                setUsers([]);
            }
        };

        fetchUsers();
    }, []);

    const userFields = [
        { name: 'userName', label: 'Nom', type: 'text'},
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Mot de passe', type: 'password' }
        
    ];
        


    return(
        <main>
            <Modal 
                modalId = "addUserModal"
                textPosition= "text-center row justify-content-start"
                title = "Ajouter un utilisateur"
                margin = "mt-5 ms-4_5"
                action = "http://localhost:3000/users/"
                method = "POST"
                fields = {userFields}                         
                noDisplay = "d-none"              
            />
            <div className='container-fluid mx-0 text-center'>
                <div className='row justify-content-evenly'>
                    {users.map((user) => (                    
                        <div className='col-5' key={user.userName}>
                            <DisplayCard 
                            col1="col-6"
                            icon1={userIcon} iconAlt1="user_icon" text1={user.userName} 
                            icon2={emailIcon} iconAlt2="email_icon" text2={user.email}
                            rowDisplay='d-none' display='d-none'
                            />
                        </div>
                                                
                    ))}
                </div>  
                
            </div>
        </main>
    );

}

export default Users;