//Librairie
import React from 'react'
import { withRouter } from 'react-router'
import Styled from 'styled-components'


// Composant
import NavigationItem from './NavigationItem'

// Styled Components

const UlComponent= Styled.ul`
  list-style-type:none;
  display:flex;
  margin:0;
  padding:0;
  @media screen and (max-width:767px){
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:fixed;
    right:-100vw;
    bottom:0;
    height:100vh;
    padding:2rem;
    background-color: #cfc5a5;
    visibility: hidden;
  }
  `
const ButtonComponent = Styled.button`
  background-color: #faf3e0;
  margin: 8px;
  border-radius: 5px;
  border: 1px solid #cfc5a5;
  cursor: pointer;
  font-weight: bolder;
  &:hover {
    background-color: #cfc5a5 ;
    color: white;
  }
`  


function Navigation (props){
  
    // Fonctions: 
    const LogoutClickedHandler = ()=>{
        console.log("déconnexion")
        localStorage.removeItem("user");
        // je redirige l'utilisateur sur la page d'acceuil :
         props.history.push('/home');
         window.location.reload(); 
    }



    return(
        <UlComponent>
          {!props.user ? <NavigationItem exact navLink="/home"> Home </NavigationItem> : null } 
          {props.user ? <NavigationItem exact navLink="/profil"> Profil </NavigationItem> : null}
          {props.user ? <NavigationItem navLink="/filActu"> Fil d'actualité </NavigationItem> : null}
          {props.user ? <NavigationItem navLink='/ajouterPost'> Ajouter un message </NavigationItem> : null}
           {props.user ? <NavigationItem navLink="/users"> Users </NavigationItem> : null}
           {props.user ? <NavigationItem exact navLink="/contact"> Contact </NavigationItem> : null}
           {!props.user ? <NavigationItem exact navLink="/signUp"> SignUp </NavigationItem> : null}
           {!props.user ? <NavigationItem exact navLink="/login"> Login </NavigationItem> : null}
           {props.user ? <ButtonComponent onClick={LogoutClickedHandler}>Déconnexion</ButtonComponent> : null}

        </UlComponent>
    )
}
// on utilise withRouter pour pouvoir utiliser les props. 
export default withRouter(Navigation)