// Librairie
import React from 'react'
import classes from '../MyPosts/MyPosts.module.css'


function MyPost(props){
    return(
        <div className={classes.MyPostContainer} >
        <div><h3>{props.myPost.titre} </h3>
        <span style={{display:"block", fontStyle:"italic"}}>
                    Publié le:{new Date(props.myPost.createdAt).toLocaleDateString("fr-FR") }<br/>
                     {new Date(props.myPost.createdAt).toLocaleTimeString("fr-FR") } </span>
        </div>
        <p>{props.myPost.contenu}</p>
        <p><img src={props.myPost.imageUrl} alt="" style={{width:"140px", height:"140px"}}></img> </p>
        </div>
    )
}

export default MyPost