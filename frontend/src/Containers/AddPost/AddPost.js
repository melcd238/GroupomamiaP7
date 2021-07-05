// Librairie
import React, { useState } from 'react';
import classes from '../AddPost/AddPost.module.css';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';
//Components
import Input from '../../Components/UI/Input'
function AddPost (props){
    // States
   const [selectedFile , setSelectedFile] = useState(null)
    const [inputs, setInputs] = useState({
        titre:{
            elementType: 'input',
            elementCongig:{
                type:'text',
                placeholder: "Titre du message"
            },
            value: props.location.state && props.location.state.post ? props.location.state.post.titre : "",
            label: 'Titre',
            valid: props.location.state && props.location.state.post ? true : false,
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
            value: props.location.state && props.location.state.post ? props.location.state.post.contenu: "",
            label: 'Contenu',
            valid: props.location.state && props.location.state.post ? true : false,
            validation:{
                required: true,
                minLength: 5,
                maxLength:400
            },
            touched: false,
            errorMessage: "Le contenu doit faire entre 5 et 250 caractères"
        },
        imageUrl:{
            elementType: 'input',
            elementCongig:{
                type:"file",
                accept:".png, .jpg, .jpeg, .gif",
                name:"file"
             },
             defaultValue: props.location.state && props.location.state.post ? props.location.state.post.imageUrl : selectedFile,
             label:'Image/GIF',
             valid:  true,
             validation:{
                 required:false
             }
        }

    })
    const [valid, setValid] = useState(props.location.state && props.location.state.post ? true : false)
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
// trim() supprime les espaces vides autour 



  const inputChangedHandler = (event, id) =>{
      // Change la valeur
        const newInputs = {...inputs};
        if(event.target.files){  
            newInputs[id].value = event.target.files[0]
             setSelectedFile(newInputs[id].value)
          }
     newInputs[id].value= event.target.value
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
    formData.append("titre",inputs.titre.value);
    formData.append("contenu",inputs.contenu.value);
    if(selectedFile){
        formData.append("image", selectedFile); 
    }
   

       
    
    if(props.location.state && props.location.state.post){
        axios.put('user/updatePost/' + props.location.state.post.id ,formData,{ headers: authHeader(),"Content-Type": "multipart/form-data" })
        .then(response=>{
            console.log(response)
            props.history.replace('/filActu') 
            
        })
        .catch(error =>{
            console.log(error)
        })

    }else{
        axios.post('user/createPost',formData ,{ headers: authHeader(),"Content-Type": "multipart/form-data", })
        .then(response=>{
            console.log(response)
            props.history.replace('/filActu') 
           // window.location.reload(); 
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
        <form className={classes.AddMessage} onSubmit={(e)=> formHandler(e)} >
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
         
            


       <input className={classes.inputSubmitAddMessage} 
              type="submit" 
              value={props.location.state && props.location.state.post ? "Modifier" : "Publier"}
              disabled={!valid}/>
    </form>
    )
    return(
        <div className={classes.container}>
            {props.location.state && props.location.state.post ?
             <h1> Modifier </h1>
             :
             <h1>   Publier  </h1>
        }
                  
           
           {form}
        </div>
    )
}

export default AddPost