//Librairie
import React from 'react'
import Styled from 'styled-components'
import {NavLink} from 'react-router-dom'

//Styled Components
const LiComponents = Styled.li`
margin: 10px 10px;
@media screen and (max-width:767px){
    margin: 5px -4px;
    padding: 5px -5px; 
}
`


function NavigationItem (props){
    return(
        <LiComponents>
            <NavLink to={props.navLink}
                      style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.6)",fontWeight:"bolder"}}
                      activeStyle={{textDecoration:"underline white double" , color:"black"}}
                      exact={props.exact}>{props.children}
            </NavLink>
        </LiComponents>
    )
}

export default NavigationItem