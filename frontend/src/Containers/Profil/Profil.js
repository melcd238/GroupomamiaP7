//Librairie
import React, { useState, useEffect } from 'react'
import classes from '../Profil/Profil.module.css'
import axios from '../../Services/AxiosApi';
import authHeader from '../../Services/AuthHeader';



//Composants
import profilAvatar from '../../Images/profilAvatar.svg'
import AddProfil from '../AddProfil/AddProfil';
import UpdateUser from '../UpdateUser/UpdateUser';
import UpdatePassword from '../UpdatePassword/UpdatePassword';



function Profil (props){
    //State
    const [oneUser, setOneUser]= useState({})
    const [openCreateProfilUser, setOpenCreateProfilUser]=useState(false)
    const [openUpdateUser, setOpenUpdateUser ]= useState(false)
    const [openModifMdp, setOpenModifMdp] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));


    // Functions
    const OpenCreateProfil=() =>{
         setOpenCreateProfilUser(!openCreateProfilUser)
    }
    const OpenUpdateUser = () =>{
         setOpenUpdateUser(!openUpdateUser)
    }
    const OpenModifPassword=()=>{
         setOpenModifMdp(!openModifMdp)
          
    }
    const DeleteMyUserhandler = ()=>{
      const id = oneUser.id
      axios.delete('user/deleteOneUser/' + id ,{ headers: authHeader() } )
        .then(response=>{
          console.log(response)
          localStorage.removeItem("user");
          props.history.push('/home');
          window.location.reload(); 
        })
        .catch(error=>{
          console.log(error)
      })
    }
    const getUser = ()=>{
     
      const id = user.id
      axios.get('user/getOneUser/' + id , { headers: authHeader() })
      .then( response=>{
          console.log(response.data.user)
          const myUser = response.data.user
          setOneUser(myUser)
      })
      .catch(error=>{
          console.log(error)
      })
    }
   

    // UseEffect pour recuperer les données du User. 
    useEffect(()=>{
       getUser()
       
        
     },[user.id])

    return(
        <>
        <div className={classes.profilContainer}>
        <h1> Bienvenu  {oneUser.username} sur votre compte Groupomania </h1>
          <div className={classes.userParamProfil}>
            <div className={classes.userParams}>
               <h2>Paramètres de mon compte</h2>
                  <ul className={classes.paramsListe}>
                      <li>Username : {oneUser.username}</li>
                      <li>Email : {oneUser.email}</li>
                  </ul>
                  

                <div><i className="fas fa-user-edit" style={{cursor:"pointer"}}
                         onClick={OpenUpdateUser}></i> </div>

                         {openUpdateUser ?
                         <UpdateUser User={oneUser}
                                     fetchUser={getUser}
                                     displayForm={OpenUpdateUser}/>
                         :
                         null

                         }
                    <div> <button style={{backgroundColor:"#cfc5a5", border:"none", cursor:"pointer",borderRadius:"5px"}}
                          onClick={OpenModifPassword}>Modifier mon password </button></div> 

                          {openModifMdp ? 
                             <UpdatePassword displayForm={OpenModifPassword}/>
                            :
                            null}    
            </div>
            

             <div className={classes.userProfil}>
                 <h2>Mon profil</h2>
                 {oneUser.profil && oneUser.profil.avatar ? 
                 <div><img src={oneUser.profil.avatar} alt="avatar" className={classes.avatar}></img> </div>
                 :
                  <div><img src={profilAvatar} alt="avatar" className={classes.avatar}></img> </div>
                 }
                 {oneUser.profil && oneUser.profil.bio ?
                   <p>Bio : {oneUser.profil.bio}</p>
                   :
                   <p> Bio non renseignée </p>
                }
               

                {oneUser.profil ?
                
                    <i className="fas fa-user-edit" style={{cursor:"pointer"}}onClick={OpenCreateProfil}></i> 
                    :
                   <div> <button style={{backgroundColor:"#cfc5a5", border:"none", cursor:"pointer",borderRadius:"5px"}}
                          onClick={OpenCreateProfil}>Créer mon profil </button></div>
                }
                 {openCreateProfilUser ? 
            <AddProfil User={oneUser}
                       fetchUser= {getUser}
                       displayForm={OpenCreateProfil}></AddProfil>
            :
            null
        
          }
                
             </div>
           </div>
           <div className={classes.profilFooter}> 
               <i className="fas fa-user-slash" style={{cursor:"pointer"}}
                onClick={()=>DeleteMyUserhandler(oneUser.id)} >Supprimer mon compte</i>
            </div>

            <div className={classes.publications}>
              <h2>Mes publications</h2>
            </div>

        </div>
          
          </>
    )
}

export default Profil