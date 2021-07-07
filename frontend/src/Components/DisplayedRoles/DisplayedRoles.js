//Librairie
import React from 'react'



function DisplayedRoles (props){
  
    let roles = props.roles.map(role=>(
        
            <li key={role.id} style={{fontWeight:"bolder"}}>{role.name}</li>
       
    ))



    return(
        <>
        {roles}
        </>

    )
}

export default DisplayedRoles