//Librairie
import React from 'react'
import LogoNotFound from '../../Images/notFoundLogo.png'
import { Link } from 'react-router-dom'


function NotFound (props){
    return(
        <>
        <h1 style={{color:"#e84545",fontSize:"2rem"}}> La page que vous cherchez<br/> n'existe pas!! </h1>
        <div>
            <img src={LogoNotFound} 
                 alt="Logo page non trouvée!"
                 style={{width:"25%",borderRadius:"10px",marginTop:"30px"}}></img>
        </div>
        <p style={{color:"#e84545",fontSize:"3rem",margin:"10px 0 10px 0"}}>Erreur 404</p>
        <Link to="/home"><button style={{backgroundColor:"#e84545",borderRadius:"4px",border:"1px solid #e84545"}}> Retour à la page Home </button></Link>  
        
        
        </>
    )
}

export default NotFound