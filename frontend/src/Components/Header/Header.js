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
  flex-wrap: no-wrap;
  align-items: center;
  background-color:#cfc5a5;
  min-height : 40px;
`


function Header (props){

  return(
        <HeaderComponent>
            <div style={{marginLeft:"20px"}}>
              <img src={Logo} alt="Logo de Groupomania" style={{width:"140px"}}></img>  
            </div> 
            
              <Navigation user={props.user}></Navigation>
           
        </HeaderComponent>
    )
}

export default Header