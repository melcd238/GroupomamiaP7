// Librairie
import React , { useState } from 'react'
import classes from '../AddComment/AddComment.module.css';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';

// Composant
import Input from '../../Components/UI/Input'


function AddComment (props){
    
    const [inputs, setInputs] = useState({
        
        content:{
            elementType: 'textarea',
            elementCongig:{
                placeholder: "Que voulez-vous répondre?"
                
            },
            value: props.location.state && props.location.state.comment ? props.location.state.comment.content : '',
            label: 'Commentaire',
            valid: props.location.state && props.location.state.comment ? true : false,
            validation:{
                required: true,
                minLength: 5,
                maxLength:200
            },
            touched: false,
            errorMessage: "Le contenu doit faire entre 5 et 200 caractères"
        }
        

    })
    const [valid, setValid] = useState(props.location.state && props.location.state.comment ? true : false)
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
  const newComment = {
      
      content:inputs.content.value,
      
     
  }
  if(props.location.state && props.location.state.comment){
    axios.put('user/post/updateComment/' + props.location.state.comment.id ,newComment ,{ headers: authHeader() })
    .then(response=>{
        console.log(response)
        props.history.replace('/filActu') 
      
    })
    .catch(error =>{
        console.log(error)
    }) 

  }else{
  axios.post('user/post/createComment/' + props.match.params.id ,newComment ,{ headers: authHeader() })
  .then(response=>{
      console.log(response)
      props.history.replace('/filActu') 
     
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
      <form className={classes.AddComment} onSubmit={(e)=> formHandler(e)} >
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
      
     <input className={classes.inputSubmitAddComment} type="submit" 
            value= {props.location.state && props.location.state.comment ? "Modifier" : "Publier"  }  
            disabled={!valid}/>
  </form>
  )
    

  return(
      <div className={classes.container}>
          {props.location.state && props.location.state.comment ?
             <h1> Modifier ce post</h1>
             :
             <h1> Commenter ce post </h1>
          }
          
         {form}
      </div>
  )

}

export default AddComment