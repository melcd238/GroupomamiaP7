// Librairies
import React from 'react'
import classes from '../DisplayedPosts/DisplayedPosts.module.css'

// Composant
import CardPost from '../CardPost/CardPost'




function DisplayedPosts(props){
   // Attention, on retourne du jsx donc ()après post dans map()
   let posts=props.posts.map(post=>(
       <CardPost key={post.id}
                  post={post}/>

   ))

    return(
        <section className={classes.DisplayedPostsContainer}>
            {posts}
        </section>
    )
}

export default DisplayedPosts