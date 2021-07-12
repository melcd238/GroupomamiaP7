// Librairie
import React from 'react';
import classes from '../CardUser/CardUser.module.css';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';

//Composant
import profilAvatar from '../../Images/profilAvatar.svg'
import DisplayedRoles from '../DisplayedRoles/DisplayedRoles';

//function
const user = JSON.parse(localStorage.getItem('user'));
const DeleteUserClickHandler = (id)=>{
    axios.delete('/user/admin/deleteOneUser/' + id ,{ headers: authHeader() })
    .then(response=>{
        console.log(response)
       // props.fetchUsers(); 
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
               <ul style={{listStyleType:"none", margin:"0",padding:"0"}}> Role(s) : <DisplayedRoles roles={props.user.roles}/> </ul>
                
               <p> User crée le : <strong>{new Date(props.user.createdAt).toLocaleDateString("fr-FR") } </strong> </p>
            </div>
            <div className={classes.profilContainer}>
                <div>
                    { props.user.profil && props.user.profil.avatar ?
                    <img src={props.user.profil.avatar} alt="avatar"
                    className={classes.avatar}></img>
                    :
                    <img src={profilAvatar} alt="avatar" className={classes.avatar}></img>
                    }               
                </div>
                { props.user.profil && props.user.profil.bio ?
             <p>Bio: <strong>{props.user.profil.bio}</strong></p>
             : 
             <p>Bio non renseignée </p>
                }
            </div>
            {user.roles[1] === "admin" ?
            <i className="fas fa-trash-alt" style={{margin:"0px 20px",cursor:"pointer"}}
            onClick={()=>DeleteUserClickHandler(props.user.id)}></i>
            : null
            }
        </div>
    )
}

export default CardUser