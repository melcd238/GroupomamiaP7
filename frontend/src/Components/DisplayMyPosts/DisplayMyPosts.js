// Librairie
import React from 'react'
import classes from '../DisplayMyPosts/DisplayMyPosts.module.css'

// Composant
import MyPost from '../MyPosts/MyPosts'




function DisplayMyPosts (props){
   let myPosts = props.myPosts.map(myPost=>(
       <MyPost key={myPost.id}
               myPost={myPost}/>

   ))
    return(
        <div className={classes.DisplayMyPostsContainer} >
         {myPosts}
        </div>
    )
}

export default DisplayMyPosts