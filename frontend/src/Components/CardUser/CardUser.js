// Librairie
import React from 'react';
import classes from '../CardUser/CardUser.module.css';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';


//function
const user = JSON.parse(localStorage.getItem('user'));
const DeleteUserClickHandler = (id)=>{
    axios.delete('/user/admin/deleteOneUser/' + id ,{ headers: authHeader() })
    .then(response=>{
        console.log(response)
        window.location.reload(); 
    })
    .catch(error=>{
        console.log(error)
    })
}


function CardUser (props){
    return(
        <div className={classes.CardUserContainer}>
            <div className={classes.usercontainer}>
               <p> User: <strong>{props.user.username}</strong></p>
               <p> User crée le : <strong>{new Date(props.user.createdAt).toLocaleDateString("fr-FR") } </strong> </p>
            </div>
            <div className={classes.profilContainer}>
             Profil
            </div>
            {user.roles[1] === "ROLE_ADMIN" ?
            <i className="fas fa-trash-alt" style={{margin:"0px 20px",cursor:"pointer"}}
            onClick={()=>DeleteUserClickHandler(props.user.id)}></i>
            : null
            }
        </div>
    )
}

export default CardUser