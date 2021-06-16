//Librairie
import React from 'react'
import classes from './Contact.module.css'

function Contact (){
    return(
        <div className={classes.contactContainer}>
        <div>
        <h1> Nous contacter</h1>
        <p> Groupomania <br/>
         100 rue du dev 17100 Saintes <br/>
         (+33) 6 XX XX XX XX
         </p>
        <a href="mailto:contact@groupomania.com"> contact@groupomania.com</a>
        </div>
        
            <h1>Suivez-nous sur nos réseaux sociaux </h1>

          <div className={classes.containerSocial}>
               <div className={classes.social} style={{background:"#3b5998" }}>
                   <i className="fab fa-facebook fa-2x"></i>
               </div> 
               <div className={classes.social} style={{background:"#F46F30"}}>
                   <i className="fab fa-instagram fa-2x"></i>
               </div>
               <div className={classes.social} style={{background:"#00aced"}}>
                   <i className="fab fa-twitter-square fa-2x"></i>
               </div>
               <div className={classes.social} style={{background:"#bb0000"}}>
                   <i className="fab fa-youtube fa-2x"></i>
               </div>
               <div className={classes.social} style={{background:"#007BB5"}}>
                   <i className="fab fa-linkedin fa-2x"></i>
               </div> 
            </div>
            </div>  

      
        
    )
}

export default Contact