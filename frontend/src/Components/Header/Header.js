//Librairie
import React, { useState } from 'react'
import Styled from 'styled-components'
import Logo from '../../Images/logoHeader.svg'
import classes from '../Header/Header.module.css'


//Composants
import Navigation from './Navigation'

//Styled Components
const HeaderComponent = Styled.header`
  border-bottom:1px solid silver;
  display: flex;
  justify-content:space-between;
  flex-wrap: no-wrap;
  align-items: center;
  background-color:#cfc5a5;
  height : 40px;
`


function Header (props){
  // State
  const [showBurger, setShowBurger]=useState(false)

  // Fonction
  const BurgerClickHandler = ()=>{
     setShowBurger(!showBurger)
  }   
  
  return(
        <HeaderComponent>
            <div style={{marginLeft:"20px"}}>
              <img src={Logo} alt="Logo de Groupomania" style={{width:"140px"}}></img>  
            </div> 
            <nav className={classes.showNav}>  
              <Navigation user={props.user}></Navigation>
            </nav>
            <button className={classes.navbarBurger}
                    onClick={BurgerClickHandler}> 
                <span className={classes.burgerBar}> </span>
            </button>
        </HeaderComponent>
    )
}

export default Header