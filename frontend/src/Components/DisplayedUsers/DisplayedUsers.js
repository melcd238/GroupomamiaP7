// Librairie
import React from 'react'
import classes from '../DisplayedUsers/DisplayedUsers.module.css'


//Componants
import CardUser from '../CardUser/CardUser'

function DisplayedUsers (props){
   let users = props.users.map(user=>(
       <CardUser key={user.id}
                 user={user}
                 />
   ))


    return(
        <section className={classes.DisplayedUsersContainer}>
           {users}
        </section>
    )
}

export default DisplayedUsers