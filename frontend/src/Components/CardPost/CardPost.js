// Librairie
import React, { useState } from 'react';
import classes from '../CardPost/CardPost.module.css';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';
import {withRouter, Link} from 'react-router-dom';

// Composant 
import DisplayedComments from '../DisplayedComments/DisplayedComments'
import UsersLikes from '../UsersLikes/UsersLikes';
import profilAvatar from '../../Images/profilAvatar.svg'

function CardPost(props){
     //State
     const [displayComments, setDisplayComments] = useState(false)
     const user = JSON.parse(localStorage.getItem('user'));
 
   //function
const OpenCommentClickHandler = (id) =>{
        setDisplayComments(!displayComments)
}



const DeletePostHandler = (id) =>{
    axios.delete('user/deletePost/' + id ,{ headers: authHeader() })
    .then( response=>{
        console.log(response)
        props.fetchPosts()
       
    })
    .catch(error=>{
        console.log(error)
    })
}

const LikePostHandler = (id) =>{
  
    axios.post('user/post/createLike/' + id, {} , { headers: authHeader() }) 
        .then(response=>{
            console.log(response.data)
            props.fetchPosts()
           
        })
        .catch(error=>{
            console.log(error)
        })
}

const AdminDeletePostHandler = (id)=>{
    axios.delete('user/admin/deletePost/' + id , { headers: authHeader() } )
    .then( response=>{
        console.log(response)
        props.fetchPosts()
       
    })
    .catch(error=>{
        console.log(error)
    })
}


 

    return(
        <>
        <div className={classes.CardPost}>
            <div className={classes.CardPostHeader}>
                <div style={{display:"flex"}}>
                    <div>
                { props.post.user.profil && props.post.user.profil.avatar? 
                 <img src={props.post.user.profil.avatar} style={{width:"40px", height:"40px",borderRadius:"50%", border:"1px solid white"}} alt="avatar" ></img>
                 :
                 <img src={profilAvatar} alt="avatar" style={{width:"40px", height:"40px",borderRadius:"50%"}} ></img>
                }
                   </div>
                <div style={{fontStyle:"normal", margin:"10px",fontWeight:"bolder",textTransform:"capitalize"}}>{props.post.user.username}</div>
                 </div>
                <h2 style={{margin:"0px",textTransform:"capitalize"}}>{props.post.titre}</h2>
                <span style={{display:"block", fontStyle:"italic"}}>
                    Publié le:{new Date(props.post.createdAt).toLocaleDateString("fr-FR") }<br/>
                     {new Date(props.post.createdAt).toLocaleTimeString("fr-FR") }

                     {user.roles[1] === "admin" ?
                   <i className="fas fa-eraser" style={{margin:"0px 20px",cursor:"pointer"}}
                   onClick={()=>AdminDeletePostHandler(props.post.id)}></i> 
                  :
                  null
                } </span>
            </div>

            <div className={classes.CardPostContent}>
                 <p>{props.post.contenu} </p>

                {props.post.imageUrl === null ? null :
                 <img src={props.post.imageUrl} alt="téléchargée par le user" style={{width:"200px", height:"200px"}}></img> }
                
                {props.post && props.post.nbrlike >= 1 ? 
                <div className={classes.UsersLikes}>
                <UsersLikes likes={props.post.likes}/> 
                </div>
                :
                null
                }
                 
            </div>

            <div className={classes.CardPostFooter}>
                <div>
                <i className="far fa-thumbs-up" style={{margin:"0px 20px",cursor:"pointer"}}
                   onClick={()=>LikePostHandler(props.post.id)}
                  > <span>{props.post.nbrlike}</span></i>
                 


               <i className="far fa-comments" style={{margin:"0px 20px",cursor:"pointer"}}
                 onClick={()=>OpenCommentClickHandler(props.post.id)} > <span>{props.post.nbrComment}</span> </i>
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
                 : null
                }

            </div>
         </div> 
           {props.post && props.post.nbrComment >= 1 && displayComments ?
                    <div> <DisplayedComments comments={props.post.comments}
                                             fetchPosts={props.fetchPosts} >
                        </DisplayedComments> </div>
                    :
                    null
           }
             
              
          
        
         </>
    )
}

export default withRouter(CardPost)