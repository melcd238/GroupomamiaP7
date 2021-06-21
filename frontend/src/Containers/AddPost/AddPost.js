// Librairie
import React, { useState } from 'react';
import classes from '../AddPost/AddPost.module.css';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';

//Components
import Input from '../../Components/UI/Input'


function FilActu (props){
    // States

    const [inputs, setInputs] = useState({
        titre:{
            elementType: 'input',
            elementCongig:{
                type:'text',
                placeholder: "Titre du message"
            },
            value: '',
            label: 'Titre',
            valid: false,
            validation:{
                required: true,
                minLength: 3,
                maxLength:40
            },
            touched: false,
            errorMessage: "Le titre doit faire entre 3 et 40 caractères"
        },
        contenu:{
            elementType: 'textarea',
            elementCongig:{
                placeholder: "Que voulez-vous partager?"
                
            },
            value: '',
            label: 'Contenu',
            valid: false,
            validation:{
                required: true,
                minLength: 5,
                maxLength:400
            },
            touched: false,
            errorMessage: "Le contenu doit faire entre 5 et 400 caractères"
        },
        gifPost:{
            elementType: 'input',
            elementCongig:{
                type: 'file',
                accept: ".png, .jpg, .jpeg, .gif"
            },
            value: "",
            label: 'Image',
            valid: true,
           
           validation:{
            required: false,
            // fichier accepté passé dans la configuration 
            
        }
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
// trim() supprime les espaces vides autour 



  const inputChangedHandler = (event, id) =>{
      // Change la valeur
    const newInputs = {...inputs};
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
    const newPost = {
        titre:inputs.titre.value,
        contenu:inputs.contenu.value,
        gifPost:inputs.gifPost.value
       
    }
    axios.post('user/createPost',newPost ,{ headers: authHeader(),"Content-Type": "multipart/form-data", })
    .then(response=>{
        console.log(response)
        props.history.replace('/filActu') 
       // window.location.reload(); 
    })
    .catch(error =>{
        console.log(error)
    })
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
        <form className={classes.AddMessage} onSubmit={(e)=> formHandler(e)} >
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
        
       <input className={classes.inputSubmitAddMessage} type="submit" value="Publier" disabled={!valid}/>
    </form>
    )
    return(
        <div className={classes.container}>
           {form}
        </div>
    )
}

export default FilActu