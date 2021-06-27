//Librairie
import React from 'react'
import classes from '../Hoc/Layout.module.css'
import  {  ToastContainer   }  from  'react-toastify' ;
import  'react-toastify/dist/ReactToastify.css' ;

//Composant
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'


function Layout (props){

    return(
        <div className={classes.Layout}>
        <Header user={props.user}/>
        <div className={classes.content}>
        {props.children} 
        </div>
        < ToastContainer  />
        <Footer/>
        </div>
    )
}

export default Layout