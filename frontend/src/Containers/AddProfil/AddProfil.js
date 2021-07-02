//Libraire
import React, { useState } from 'react'
import classes from '../AddProfil/AddProfil.module.css'
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';


//components
import Input from '../../Components/UI/Input'


function AddProfil (props){
const user = JSON.parse(localStorage.getItem('user'));

const [selectedFile, setSelectedFile]=useState(null)
const [inputs, setInputs] = useState({
        
    bio:{
        elementType: 'textarea',
        elementCongig:{
            placeholder: "Une petite phrase de présentation?"
            
        },
        value: props.User.profil && props.User.profil.bio ? props.User.profil.bio   :'',
        label: 'Biographie',
        valid: props.User.profil ? true :false ,
        validation:{
            required: true,
            minLength: 5,
            maxLength:200
        },
        touched: false,
        errorMessage: "La biogaphie doit faire entre 5 et 200 caractères"
    },
    avatar:{
        elementType: 'input',
        elementCongig:{
            type:"file",
            accept:".png, .jpg, .jpeg, .gif",
            name:"file"
         },
         defaultValue: props.User.profil && props.User.profil.avatar ? props.User.profil.avatar : selectedFile,
         label:'Image/GIF',
         valid: true,
         validation:{
             required:false
         }
    }
    

})
const [valid, setValid] = useState( props.User.profil ? true :false )
console.log(props)
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
    // Change la valeur
  const newInputs = {...inputs};
  if(event.target.files){
    newInputs[id].value = event.target.files[0]
     setSelectedFile(newInputs[id].value)
  }
  newInputs[id].value = event.target.value;
  newInputs[id].touched = true;
    // Verification de la valeur
    newInputs[id].valid = checkValidity(event.target.value, newInputs[id].validation); 
 
  setInputs(newInputs);
    // Verification du formulaire
  let formIsValid = true;
  for(let input in newInputs){
      formIsValid = newInputs[input].valid && formIsValid
  } 
  setValid(formIsValid) 
};

const formHandler =(event)=>{
    event.preventDefault();
    const formData = new FormData();

    formData.append("bio",inputs.bio.value);
    if(selectedFile){
        formData.append("image", selectedFile );
    }
    
    if(props.User.profil){
        const id= user.id
        axios.put('user/updateProfilUser/' + id ,formData ,{ headers: authHeader() ,"Content-Type": "multipart/form-data"})
        .then(response=>{
            console.log(response)
            window.location.reload(); 
        })
        .catch(error =>{
            console.log(error)
        })



    }else{
   
    const id= user.id
    axios.post('user/createProfil/' + id ,formData ,{ headers: authHeader() ,"Content-Type": "multipart/form-data"})
    .then(response=>{
        console.log(response)
        window.location.reload(); 
    })
    .catch(error =>{
        console.log(error)
    })
    }
  
   }

  // transformation de mon objet en tableau
  const formElementsArray = [];
  for(let key in inputs){
      formElementsArray.push({
          id: key,
          config: inputs[key]
      });
  }
  let form = (
      
      <form className={classes.AddProfil} onSubmit={(e)=> formHandler(e)}  >
      {formElementsArray.map(formElement =>(
           <Input 
           key={formElement.id}
           id= {formElement.id}
           value={formElement.config.value}
           defaultValue={formElement.config.value}
           label={formElement.config.label}
           type={formElement.config.elementType}
           config={formElement.config.elementCongig}
           valid= {formElement.config.valid}
           touched= {formElement.config.touched}
           errorMessage = {formElement.config.errorMessage}
           changed={(e)=>inputChangedHandler(e, formElement.id)}>
           </Input>
      ))}
      
     <input className={classes.inputSubmitAddProfil} type="submit" 
            value=  "Publier"   
            disabled={!valid}/>
  </form>
  )
    



    return(
        <> 
        {props.User.profil ?  
            
               <h2>Vous pouvez maintenant modifier votre profil</h2>
             
             :
             <h2>Vous pouvez maintenant créer votre profil</h2>
        
            }
            
             
            
    
    
        {form}
        </>
    )
}

export default AddProfil