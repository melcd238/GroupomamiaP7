// Librairies
import React, {useEffect, useState} from 'react'
import './App.css';
import {Route , Switch} from 'react-router-dom'


// Composants
import Layout from './Hoc/Layout'
import Home from './Containers/Home/Home'
import SignUp from './Containers/SignUp/SignUp'
import Login from './Containers/Login/Login'
import FilActu from './Containers/FilActu/FilActu'
import AddPost from './Containers/AddPost/AddPost'
import AddComment from './Containers/AddComment/AddComment'
import Contact from './Containers/Contact/Contact'
import User from './Containers/User/User'
import Profil from './Containers/Profil/Profil'
import NotFound from './Components/NotFound/NotFound'


function App() {
  //States
  const [currentUser, setCurrentUser] = useState(undefined);

  //ComponentDidMont
  //Pour savoir si un utilisateur est connecté ou non 
  const getCurrentUser = () => {
    console.log(JSON.parse(localStorage.getItem("user")));
    return JSON.parse(localStorage.getItem("user"));
    
  };

   useEffect(()=>{
  
   const currentUser =getCurrentUser();
      if(currentUser){
        setCurrentUser(currentUser);
      }
      
   
  },[]);
 


  return (
    <div className="App">
       <Layout user={currentUser}> 
         <Switch>
           <Route exact path='/home' component={Home}></Route>
          {!currentUser ? <Route exact path='/signup' component={SignUp}></Route> : null } 
          {!currentUser ? <Route exact path='/login' component={Login}></Route> : null } 
          {currentUser ? <Route exact path='/filActu' component={FilActu}></Route> : null} 
          {currentUser ? <Route exact path='/ajouterPost' component={AddPost}></Route> : null} 
          {currentUser ? <Route exact path='/users' component={User}></Route> : null} 
          {currentUser ? <Route exact path='/profil' component={Profil}></Route> : null} 
          {currentUser ? <Route  path='/ajouterCommentaire/:id' component={AddComment}></Route> : null} 
           <Route exact path='/contact' component={Contact}></Route>
           <Route   component={NotFound}></Route>
         </Switch>
         
      </Layout>
    </div>
  );
}

export default App;
