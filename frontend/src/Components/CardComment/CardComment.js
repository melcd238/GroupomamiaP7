// Librairie
import React from "react"
import classes from '../CardComment/CardComment.module.css'

// Composants



function CardComment (props){
    return(
        <>
        <div className={classes.CardComment}>
            <div className={classes.CardCommentHeader}>
                <span style={{display:"block", fontStyle:"italic"}}>Publié par: {props.comment.user.username}</span>
                <h2 style={{margin:"0px", fontSize:".9rem"}}> Commentaire </h2>
                <span style={{display:"block", fontStyle:"italic"}}>
                    Publié le:{new Date(props.comment.createdAt).toLocaleDateString("fr-FR") }<br/>
                     {new Date(props.comment.createdAt).toLocaleTimeString("fr-FR") } </span>
            </div>

            <div className={classes.CardCommentContent}>
                 <p>{props.comment.content} </p>
                 
            </div>

            <div className={classes.CardCommentFooter}>
               
                <div>
                <i className="fas fa-edit" style={{margin:"0px 20px",cursor:"pointer"}}></i>
                <i className="fas fa-trash-alt" style={{margin:"0px 20px",cursor:"pointer"}}></i>
                </div>
            </div>
         </div>
        </>
    )
}

export default  CardComment 