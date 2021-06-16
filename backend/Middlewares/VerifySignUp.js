const db = require('../Models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail =(req,res,next)=>{
   let username = req.body.username;
   let email = req.body.email;
   let password = req.body.password;
   
   // Check si tous les champs sont remplis
   if(username == null || email == null || password == null){
       const message= `Tous les champs de formulaire doivent être remplis`
       return res.status(400).json({message})
     }
   // Check si le username n'est pas déjà utilisé
   
   User.findOne({ where : {username : req.body.username}})
       .then( user =>{
           if(user){
            const message = `Username est déjà utilisé.`
            return res.status(400).json({message});  
           }
       })
    //Check si le mail n'existe pas déja
    
    User.findOne({where: {email : req.body.email}})
         .then( user=>{
             if(user){
                const message = `Email est déjà utilisé.`
                return res.status(400).json({message});  
             }
         })

    // on passe au middleware suivant avec next()
    next();

}





checkRolesExisted = (req,res,next)=>{
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length ; i++){
            if(!ROLES.includes(req.body.roles[i])){
                const message = `Ce role n'existe pas`
                return res.status(400).json({message});
            }
        }

    }
    next();
}



const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;