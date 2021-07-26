// Librairies
import React from "react"
import classes from '../CardComment/CardComment.module.css'
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';
import { Link } from 'react-router-dom'


// Composant
import profilAvatar from '../../Images/profilAvatar.svg'


function CardComment (props){
    //function
const user = JSON.parse(localStorage.getItem('user'));
const DeleteCommentClickHandler= (id)=>{
    axios.delete('/user/post/deleteComment/' + id , { headers: authHeader() })
    .then(response=>{
        console.log(response)
        props.fetchPosts() 
    })
    .catch(error=>{
        console.log(error)
    })
}
const AdminDeleteCommentHandler = (id)=>{
    axios.delete('user/post/admin/deleteComment/' + id,{ headers: authHeader() } )
    .then(response=>{
        console.log(response)
       props.fetchPosts() 
    }) 
    .catch(error=>{
        console.log(error)
    })

}
    return(
        <>
        <div className={classes.CardComment}>
            <div className={classes.CardCommentHeader}>
            <div style={{display:"flex"}}>
                    <div>
                { props.comment.user.profil && props.comment.user.profil.avatar? 
                 <img src={props.comment.user.profil.avatar} style={{width:"40px", height:"40px",borderRadius:"50%", border:"1px solid white"}} alt="avatar" ></img>
                 :
                 <img src={profilAvatar} alt="avatar" style={{width:"40px", height:"40px",borderRadius:"50%"}} ></img>
                }
                   </div>
                <div style={{fontStyle:"normal", margin:"10px",fontWeight:"bolder" ,textTransform:"capitalize"}}>{props.comment.user.username}</div>
                 </div>

                
                <h2 style={{margin:"0px", fontSize:".9rem"}}> Commentaire </h2>
                <span style={{display:"block", fontStyle:"italic"}}>
                    Publié le:{new Date(props.comment.createdAt).toLocaleDateString("fr-FR") }<br/>
                     {new Date(props.comment.createdAt).toLocaleTimeString("fr-FR") }

                     {user.roles[1] === "admin" ?
                   <i className="fas fa-eraser" style={{margin:"0px 20px",cursor:"pointer"}}
                   onClick={()=>AdminDeleteCommentHandler(props.comment.id)}></i> 
                  :
                  null
                } </span>

            </div>

            <div className={classes.CardCommentContent}>
                 <p>{props.comment.content} </p>
                 
            </div>

            <div className={classes.CardCommentFooter}>
                {props.comment && props.comment.userId === user.id ?
                       <div>
                       <Link style={{color:"inherit"}} to={{pathname:'/ajouterCommentaire/:id', state:{comment:props.comment}}} >
                          <i className="fas fa-edit" style={{margin:"0px 20px",cursor:"pointer"}}></i>
                       </Link>    
                       
                       
                       <i className="fas fa-trash-alt" style={{margin:"0px 20px",cursor:"pointer"}}
                       onClick={()=>DeleteCommentClickHandler(props.comment.id)}></i>
                       
                       </div>
                  :
                  null     
                }
                
               
            </div>
         </div>
        </>
    )
}

export default  CardComment 