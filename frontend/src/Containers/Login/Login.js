//Librairie
import React, { useState } from 'react'
import classes from '../Login/Login.module.css'
import  {   toast  }  from  'react-toastify' ; 
import axios from '../../Services/AxiosApi'

// Component
import Input from '../../Components/UI/Input'


function Login (props){
    // State
    const [inputs, setInputs]=useState({
        username:{
            elementType: 'input',
            elementCongig:{
                type:'text',
                placeholder: "Nom de l'utilisateur"
            },
            value: '',
            label: 'Username',
            valid: false,
            validation:{
                required: true,
                minLength: 3,
                maxLength:16
            },
            touched: false,
            errorMessage: "Le username doit faire entre 3 et 16 caractères"
        },
        password:{
            elementType: 'input',
            elementCongig:{
                type:'text'
            },
            value:'',
            label:'Password',
            valid: false,
            validation:{
                required: true,
                minLength: 8,
                maxLength:20
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
      if(rules.email){
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }
      return isValid;
  
  };
   
    const inputChangedHandler =(event,id)=>{
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
        const user = {
            username:inputs.username.value,
            password:inputs.password.value
        }
        axios.post('login', user)
        .then(response =>{
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
                window.location = "/filActu"
            }
             
            
        })
        .catch(error => {
            console.log(error)
            toast.error("Utilisateur non trouvé, Veuillez vérifier vos paramètres de compte ou vous enregistrer!!!", {autoClose: 3000, pauseOnHover: false, position: "bottom-right"})
        })
        
       
    }
    // Variables
    const formElementsArray = [];
    for(let key in inputs){
        formElementsArray.push({
            id: key,
           config: inputs[key]
        });
    }

    let form = (
        <form className={classes.login} onSubmit={(e)=> formHandler(e)}>
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
            ))}
            <input className={classes.inputSubmitLogin} type="submit" value="Login" disabled={!valid}/>
        </form>
    )


    return(
        <div className={classes.container}>
        <h1>Connectez-vous</h1>
        {form}
        </div>
    )
}

export default Login