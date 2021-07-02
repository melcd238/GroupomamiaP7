// Librairie
import React from "react"
import classes from '../CardComment/CardComment.module.css'
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';
import { Link } from 'react-router-dom'



//function
const user = JSON.parse(localStorage.getItem('user'));
const DeleteCommentClickHandler= (id)=>{
    axios.delete('/user/post/deleteComment/' + id , { headers: authHeader() })
    .then(response=>{
        console.log(response)
        window.location.reload(); 
    })
    .catch(error=>{
        console.log(error)
    })
}
const AdminDeleteCommentHandler = (id)=>{
    axios.delete('user/post/admin/deleteComment/' + id,{ headers: authHeader() } )
    .then(response=>{
        console.log(response)
        window.location.reload(); 
    })
    .catch(error=>{
        console.log(error)
    })

}

function CardComment (props){
    return(
        <>
        <div className={classes.CardComment}>
            <div className={classes.CardCommentHeader}>
                <span style={{display:"block", fontStyle:"italic"}}>Publié par: <strong style={{fontStyle:"normal"}}>{props.comment.user.username}</strong>  </span>
                <h2 style={{margin:"0px", fontSize:".9rem"}}> Commentaire </h2>
                <span style={{display:"block", fontStyle:"italic"}}>
                    Publié le:{new Date(props.comment.createdAt).toLocaleDateString("fr-FR") }<br/>
                     {new Date(props.comment.createdAt).toLocaleTimeString("fr-FR") } </span>
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
                {user.roles[1] === "admin" ?
                   <i className="fas fa-eraser" style={{margin:"0px 20px",cursor:"pointer"}}
                   onClick={()=>AdminDeleteCommentHandler(props.comment.id)}></i> 
                  :
                  null
                }
               
               
            </div>
         </div>
        </>
    )
}

export default  CardComment 