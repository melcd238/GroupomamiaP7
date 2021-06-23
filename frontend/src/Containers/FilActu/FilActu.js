// Librairie
import React, {useState, useEffect} from 'react';
import classes from '../FilActu/FilActu.module.css';
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';

//Components
import DisplayedPosts from '../../Components/DisplayedPosts/DisplayedPosts'



function FilActu (props){

    // State
    const [posts , setPosts] = useState([]);
    
    
    // Fonctions
    const getAllPost = ()=>{
        axios.get('user/getAllPost',{ headers: authHeader() })
        .then(response=>{
           
            const allPost=response.data.allPost
            console.log(allPost)
            setPosts(allPost)
        })
        .catch(error =>{
            console.log(error)
        })
    }
   
    //ComponentDidMount
    useEffect(()=>{
        getAllPost()
       
    }, [])

    // On va passer notre State au composant : DisplayedPosts qui lui meme sera composé d'un composant : CardPost
    // On crée le composant DisplayedPosts auquel on passe une props posts auquel on passe notre State props 
  
    return(
        <div className={classes.container}>
        <h1>Fil d'actualité </h1>
        
        <DisplayedPosts posts={posts}></DisplayedPosts>

       
          
        </div>
    )
}

export default FilActu