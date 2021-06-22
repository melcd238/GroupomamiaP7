// Librairie
import React from "react"
import classes from '../DisplayedComments/DisplayedComments.module.css'

// Composants
import CardComment from '../CardComment/CardComment'



function DisplayedComments (props){
    
    


    return(
        <section className={classes.DisplayedComments}>

           <CardComment/>
           
        </section>
        
    )
}

export default DisplayedComments