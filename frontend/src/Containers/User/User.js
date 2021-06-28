// Librairie
import React, { useEffect, useState } from 'react'
import classes from '../User/User.module.css'
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';


//Componants
import DisplayedUsers from '../../Components/DisplayedUsers/DisplayedUsers'


function User (props){
    //State 
    const[users , setUsers] = useState([])

    //Fonction
    const getAllUser = () =>{
        axios.get('user/getAllUsers',{ headers: authHeader() })
         .then( response=>{
             const allUsers = response.data.allUsers
             console.log(allUsers)
             setUsers(allUsers)
         })
         .catch(error=>{
             console.log(error)
         })
    }

    useEffect(()=>{
       getAllUser()
    },[])

    return(
        <div className={classes.UserContainer}>
            <h1>Liste des utilisateurs</h1>
         <DisplayedUsers users={users} ></DisplayedUsers>
        </div>
    )
}

export default User