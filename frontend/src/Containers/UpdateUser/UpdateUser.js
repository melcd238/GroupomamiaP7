//Librairie
import React, {useState} from "react";
import  {   toast  }  from  'react-toastify' ;
import classes from '../UpdateUser/UpdateUser.module.css' 
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';

// Composants
import Input from "../../Components/UI/Input"


function UpdateUser (props){
    const user = JSON.parse(localStorage.getItem('user'));
     const [inputs, setInputs]= useState({
        username:{
            elementType: 'input',
            elementCongig:{
                type:'text',
                placeholder: "Nom de l'utilisateur"
            },
            value: props.User.username,
            label: 'Username',
            valid: true,
            validation:{
                required: true,
                minLength: 3,
                maxLength:16
            },
            touched: false,
            errorMessage: "Le username doit faire entre 3 et 16 caractères"
        },
        email:{
            elementType : 'input',
            elementCongig:{
                type:'email',
                placeholder:"jeanDupont@dupont.fr"
            },
            value: props.User.email,
            label:'Email',
            valid: true,
            validation:{
                required: true,
                email: true
            },
            touched: false,
            errorMessage: "L'émail doit être un émail"
        }
       // password:{
         //   elementType: 'input',
          //  elementCongig:{
           //     type:'password'
          //  },
          //  value:props.User.password,
          //  label:'Password',
          //  valid: true,
          //  validation:{
           //     required: true,
            //    minLength: 8,
            //    maxLength:16
                
          //  },
           // touched: false,
          //  errorMessage: "Le password doit faire entre 8 et 16 caractères"
    
       // }
     })
     const [valid, setValid] = useState(true)

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
  const id= user.id
  const userParams = {
      username:inputs.username.value,
      email:inputs.email.value,
      //password:inputs.password.value
  }
  axios.put('user/updateOneUser/' + id , userParams , { headers: authHeader()})
  .then(response =>{
      console.log(response)
      toast.info("La modifications de vos paramètres a bien été prise en compte!!!", {autoClose: 3000, pauseOnHover: false, position: "bottom-right"})
      props.fetchUser()
      props.displayForm();
     
     
      
  })
  .catch(error => {
      console.log(error)
  })
  
} 

const formElementsArray = [];
for(let key in inputs){
    formElementsArray.push({
         id: key,
         config: inputs[key]
    });
}

let form = (
    <form className={classes.updateUser} onSubmit={(e)=> formHandler(e)}>
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
        <input className={classes.inputSubmitUpdate} type="submit" value="Update" disabled={!valid}/>
    </form>
)



    return(
        <div className={classes.formUpdate}>
            <h3> Modifier mon compte</h3>
          {form}
        </div>
    )
}


export default UpdateUser