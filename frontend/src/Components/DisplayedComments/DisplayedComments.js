// Librairie
import React from "react"
import classes from '../DisplayedComments/DisplayedComments.module.css'

// Composants
import CardComment from '../CardComment/CardComment'



function DisplayedComments (props){
  let comments = props.comments.map(comment=>(
      <CardComment key={comment.id}
                   comment={comment}/>
  ))


    return(
        <section className={classes.DisplayedComments}>

           {comments}
           
        </section>
        
    )
}

export default DisplayedComments