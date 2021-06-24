// Librairie
import React, { useState, useEffect } from 'react';
import classes from '../CardPost/CardPost.module.css';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';
import {withRouter, Link} from 'react-router-dom';

// Composant 
import DisplayedComments from '../DisplayedComments/DisplayedComments'

function CardPost(props){
     //State
     const [displayComments, setDisplayComments] = useState(false)
     const [comments, setComments] = useState([]) 
     const user = JSON.parse(localStorage.getItem('user'));
 
   //function
const OpenCommentClickHandler = (id) =>{
        setDisplayComments(!displayComments)
}
const DeletePostHandler = (id) =>{
    axios.delete('user/deletePost/' + id ,{ headers: authHeader() })
    .then( response=>{
        console.log(response)
        window.location.reload(); 
    })
    .catch(error=>{
        console.log(error)
    })
}



 
    // componantDidMount
    useEffect(()=>{
        axios.get('user/post/getAllComment/' + props.post.id ,{ headers: authHeader() })
    .then(response=>{
       
        const allComments=response.data.allComments
        console.log(allComments)
        setComments(allComments)
    })
    .catch(error =>{
        console.log(error)
    })
       
    }, [props.post.id])
 

    return(
        <>
        <div className={classes.CardPost}>
            <div className={classes.CardPostHeader}>
                <span style={{display:"block", fontStyle:"italic"}}>Publié par: <strong style={{fontStyle:"normal"}}>{props.post.user.username}</strong> </span>
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

               <i className="far fa-comments" style={{margin:"0px 20px",cursor:"pointer"}}
                 onClick={()=>OpenCommentClickHandler(props.post.id)}            > <span>{props.post.nbrComment}</span> </i>
                </div>

               
               
                <Link className={classes.btnCommenter} to={/ajouterCommentaire/ + props.post.id}>
                    <i className="fas fa-reply" style={{cursor:"pointer"}}><span style={{marginLeft:"5px"}}>Commenter</span> </i>
                </Link>

                {props.post && props.post.userId === user.id ?
                <div>
                   <Link className={classes.btnUpdate} to={{ pathname:'/ajouterPost',
                                                           state:{post:props.post} }}>
                    <i className="fas fa-edit" style={{margin:"0px 20px",cursor:"pointer"}}></i>
                 </Link> 
                <i className="fas fa-trash-alt" style={{margin:"0px 20px",cursor:"pointer"}}
                 onClick={()=>DeletePostHandler(props.post.id)}></i>
                </div>
                :
                null
                }                 


            </div>
         </div>
           {props.post && props.post.nbrComment >= 1 && displayComments ?
                    <div> <DisplayedComments comments={comments} ></DisplayedComments> </div>
                    :
                    null
           }
             
              
          
        
         </>
    )
}

export default withRouter(CardPost)