//Librairie
import React from 'react'
import classes from '../UsersLikes/UsersLikes.module.css'


function UsersLikes (props){
    let likes = props.likes.map(like=>(
        <li key={like.id} style={{textTransform:"capitalize"}}> {like.user.username} </li>
    )
        
    )
    return(
        <ul className={classes.UsersLikesContainer}>
        {likes}
        </ul>
    )
}

export default UsersLikes