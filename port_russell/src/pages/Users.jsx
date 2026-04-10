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
                        setUsers(data);                                                                  
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
                margin = "mt-5"
                action = "http://localhost:3000/users/"
                method = "POST"
                fields = {userFields}
                /*id1 = "userName" type1 = "text" value1 = "" label1 = "Nom"
                id2 = "email" type2 = "email" value2 = "" label2 = "Email"
                id3 = "password" type3 = "password" value3 = "" label3 = "Mot de passe"
                id4 = "" type4 = "" value4 = "" label4 = ""
                id5 = "" type5 = "" value5 = "" label5 = ""*/
                disabledInput = {false}                
            />
            <div className='container'>
                <div className='row'>
                    {users.map((user) => (                    
                        <div className='col-6' key={user.userName}>
                            <DisplayCard 
                            col1="col-6"
                            icon1={userIcon} iconAlt1="user_icon" text1={user.userName} 
                            icon2={emailIcon} iconAlt2="email_icon" text2={user.email}
                            icon3="" iconAlt3="" text3="" icon4="" iconAlt4="" text4=""
                            text5="" display="d-none" rowDisplay="d-none"
                            />
                        </div>                        
                    ))}
                </div>  
                
            </div>
        </main>
    );

}

export default Users;