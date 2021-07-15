//Librairie
import React, { useState } from 'react'
import classes from '../UpdatePassword/UpdatePassword.module.css'
import  {   toast  }  from  'react-toastify';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';

// Composant
import Input from '../../Components/UI/Input'


function UpdatePassword (props){
    const user = JSON.parse(localStorage.getItem('user'));
    // State 
    const [inputs, setInputs]= useState({
          password:{
           elementType: 'input',
           elementCongig:{
                type:'password'
            },
            value:"",
            label:' Nouveau Password',
             valid: false,
              validation:{
                required: true,
               minLength: 8,
               maxLength:16
                
           },
           touched: false,
            errorMessage: "Le password doit faire entre 8 et 16 caractères"
         }
    })
    const [valid, setValid] = useState(false)

    //Fonctions :
const checkValidity = (value , rules)=> {
  let isValid = true;
   if(rules.required){
 isValid = value.trim() !=='' && isValid;
}
 
  if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid
  }
  if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid
  }
 
  return isValid;

};
const inputChangedHandler = (event, id) =>{
    const newInputs = {...inputs};
    newInputs[id].value = event.target.value;
    newInputs[id].touched = true;
    newInputs[id].valid = checkValidity(event.target.value, newInputs[id].validation);
    setInputs(newInputs);
    let formIsValid = true;
  for(let input in newInputs){
      formIsValid = newInputs[input].valid && formIsValid
  } 
  setValid(formIsValid) 
};
const formHandler =(event)=>{
    event.preventDefault();
    const id = user.id
    const newPassword = {password:inputs.password.value };
    console.log(newPassword)
    axios.put('user/updatePassword/' + id , newPassword,{ headers: authHeader()} )
         .then(response=>{
             console.log(response)
             toast.info("La modifications de votre mot de passe a bien été prise en compte!!!", {autoClose: 3000, pauseOnHover: false, position: "bottom-right"})
             props.displayForm();
         })
         .catch(error=>console.log(error))
}




const formElementsArray = [];
for(let key in inputs){
    formElementsArray.push({
         id: key,
         config: inputs[key]
    });
}

let form = (
    <form className={classes.updateMdp} onSubmit={(e)=> formHandler(e)}>
        {formElementsArray.map(formElement =>(
            <Input 
                  key={formElement.id}
                  id= {formElement.id}
                  value={formElement.config.value}
                  label={formElement.config.label}
                  type={formElement.config.elementType}
                  config={formElement.config.elementCongig}
                  valid= {formElement.config.valid}
                  touched= {formElement.config.touched}
                  errorMessage = {formElement.config.errorMessage}
                  changed={(e)=>inputChangedHandler(e, formElement.id)}>
            </Input>
            //formElement.id pour savoir quel input nous modifions
        ))}
        <input className={classes.inputSubmitUpdateMdp} type="submit" value="Update" disabled={!valid}/>
    </form>
)


    return(
        <div className={classes.formUpdate}>
              <h3>Modifier mon mot de passe</h3>
                 {form}
        </div>
       
    )
}

export default UpdatePassword