//Librairie
import React from 'react'
import Styled from 'styled-components'
import Logo from '../../Images/logoHeader.svg'


//Composants
import Navigation from './Navigation'

//Styled Components
const HeaderComponent = Styled.header`
  border-bottom:1px solid silver;
  display: flex;
  justify-content:space-between;
  align-items: center;
  background-color:#cfc5a5;
`


function Header (props){
    return(
        <HeaderComponent>
            <div style={{marginLeft:"20px"}}>
              <img src={Logo} alt="Logo de Groupomania" style={{width:"140px"}}></img>  
            </div> 
            <nav>  
              <Navigation user={props.user}></Navigation>
            </nav>
        </HeaderComponent>
    )
}

export default Header