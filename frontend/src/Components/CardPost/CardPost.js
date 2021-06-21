// Librairie
import React from 'react'
import classes from '../CardPost/CardPost.module.css'



function CardPost(props){
    return(
        <div className={classes.CardPost}>
            <div className={classes.CardPostHeader}>
                <span style={{display:"block", fontStyle:"italic"}}>Publié par: {props.post.user.username}</span>
                <h2 style={{margin:"0px"}}>{props.post.titre}</h2>
                <span style={{display:"block", fontStyle:"italic"}}>
                    Publié le:{new Date(props.post.createdAt).toLocaleDateString("fr-FR") }<br/>
                     {new Date(props.post.createdAt).toLocaleTimeString("fr-FR") } </span>
            </div>

            <div className={classes.CardPostContent}>
                 <p>{props.post.contenu} </p>

                {props.post.gifPost === null ? null :
                 <img src={props.post.gifPost} alt="téléchargée par le user" style={{width:"140px", height:"140px"}}></img> }
                
                 
            </div>

            <div className={classes.CardPostFooter}>
                <div>
                <i className="far fa-thumbs-up" style={{margin:"0px 20px",cursor:"pointer"}}></i>
               <i className="far fa-comments" style={{margin:"0px 20px",cursor:"pointer"}}> <span>{props.post.nbrComment}</span> </i>
                </div>

                <div>
                <i className="fas fa-edit" style={{margin:"0px 20px",cursor:"pointer"}}></i>
                <i className="fas fa-trash-alt" style={{margin:"0px 20px",cursor:"pointer"}}></i>
                </div>
            </div>
         </div>
    )
}

export default CardPost