//Librairies
import React from 'react'

//Component

import logoHome from '../../Images/logoHome.svg'



function Home (){
    return(
        <>
        
        <h1 style={{borderBottom:"solid white 3px", margin:"40px 130px", padding:"20px"}}> Bienvenu sur le réseau social interne de Groupomania</h1>
        <div>
        <img src={logoHome} alt="logo groupomania" style={{width:"160px", height:"160px"}}></img>
        <p>Rejoignez vos collaborateurs et apprennez à vous connaître <br/>
        dans un cadre moins formel.N'attendez plus... </p>
        </div>
        
        </>
    )
}

export default Home


