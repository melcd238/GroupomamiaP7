// Librairies
import React from 'react'
import classes from '../UI/Input.module.css'



function Input(props){
    let inputElement;
    const inputClasses=[];

    if(!props.valid && props.touched){
        inputClasses.push(classes.invalid)

    }

    switch(props.type){
        case('input'):
             inputElement = (<input {...props.config}
                                    value = {props.value}
                                    className = {inputClasses}
                                    onChange = {props.changed}
                                    id={props.id}/>);
          break;
        case('textarea'):
              inputElement = (<textarea {...props.config} 
                                        value={props.value}
                                        className = {inputClasses}
                                        onChange = {props.changed}
                                        id={props.id}></textarea>);
          break;
          default:
              console.log("choisir un autre inputElement")
                                          
    }

    return(
        <>
        <div className={classes.Input}>
            <label htmlFor={props.id}>{props.label}</label>
            {inputElement}
         
        </div>
        {!props.valid && props.touched  ? <span style={{color:"red"}}>{props.errorMessage}</span> : null }
        </> 
    )

}

export default Input