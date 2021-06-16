//Librairie
import React from 'react'
import Styled from 'styled-components'
import {NavLink} from 'react-router-dom'

//Styled Components
const LiComponents = Styled.li`
margin: 10px 10px;
`


function NavigationItem (props){
    return(
        <LiComponents>
            <NavLink to={props.navLink}
                      style={{textDecoration:"none",color:"white",fontWeight:"bolder"}}
                      activeStyle={{color:"black"}}
                      exact={props.exact}>{props.children}
            </NavLink>
        </LiComponents>
    )
}

export default NavigationItem