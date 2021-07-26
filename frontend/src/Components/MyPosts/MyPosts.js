// Librairies
import React, {useState} from 'react'
import classes from '../MyPosts/MyPosts.module.css'

// Composants 
import DisplayedComments from '../DisplayedComments/DisplayedComments'



function MyPost(props){
         //State
         const [displayComments, setDisplayComments] = useState(false)
         
     
       //function
    const OpenCommentClickHandler = (id) =>{
            setDisplayComments(!displayComments)
    }
    return(
        <>
        <div className={classes.MyPostContainer} >

        <div><h3 style={{textTransform:"capitalize"}}>{props.myPost.titre} </h3>
        <span style={{display:"block", fontStyle:"italic"}}>
                    Publié le:{new Date(props.myPost.createdAt).toLocaleDateString("fr-FR") }<br/>
                     {new Date(props.myPost.createdAt).toLocaleTimeString("fr-FR") } </span>
        </div>
        <div>
        <p>{props.myPost.contenu}</p>
        {props.myPost.imageUrl === null ? null  : 
        <p><img src={props.myPost.imageUrl} alt="" style={{width:"140px", height:"140px"}}></img> </p>
        }
        </div>

        <i className="far fa-comments" style={{margin:"10px 0px",cursor:"pointer"}}
         onClick={()=>OpenCommentClickHandler(props.myPost.id)} > <span>{props.myPost.nbrComment}</span> </i>
                
                
        </div>
         {props.myPost && props.myPost.nbrComment >= 1 && displayComments ?
            <div> <DisplayedComments comments={props.myPost.comments} >
                </DisplayedComments> </div>
            :
            null
        }
        </>
    )
}

export default MyPost