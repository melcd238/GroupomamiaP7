const db = require("../models");
const fs = require('fs');
const { profil } = require("../models");
const User = db.user;
const Profil = db.profil;
const UserId = require('../Services/GetUserId')

// Création du profil.
exports.createProfilUser = (req,res,next) =>{
    const idUser= UserId(req)
    User.findOne({where :{id : idUser}})
    .then(userFound=>{
        if(!userFound){
            const message = "Le User n'existe pas"  
            return res.status(400).json({ erreur: message})
        }else{
            Profil.create({
                bio: req.body.bio,
                avatar: req.file ? `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`: null,
                userId: idUser
            })
            .then( profil=>{
                return res.status(200).json({profil})

            })
            .catch(error=>{
                console.log(error)
                return res.status(404).json({message: "Impossible de créer un Profil!"})
            })
        }
    })
    .catch()
}

// Affichage du profil
exports.getProfilUser = (req, res, next)=>{
    Profil.findOne({ where : {id: req.params.id}})
    .then( profil=>{
        return res.status(200).json({profil})
    })
    .catch(error=>{
        console.log(error)
    })
     
}

// modification du profil
exports.updateProfilUser = (req,res,next)=>{
    const id = req.params.id
    Profil.findOne({where : {id : id}})
      .then( profil=>{
        if(!profil){
            const message = "Le profil n'existe pas"
            return res.status(400).json({ erreur: message})
          }
          if(profil.userId ===  UserId(req)){
            if (req.file){
                if (profil.avatar !== null){
                    const fileName = profil.avatar.split('/upload/')[1];
                    fs.unlink(`upload/${fileName}`, (err => {
                        if (err) console.log(err);
                        else {
                            console.log("Image supprimée: " + fileName);
                        }
                    }));
                }
                req.body.avatar = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
              }
              profil.update( { ...req.body, id: req.params.id} )
              .then((newProfil)=>{
                const message = 'Le profil a bien été modifié'
                return res.status(200).json({ message, newProfil}) 
              })
              .catch(error=>{
                const message = "le profil n'a pas pu être modifié"
                return res.status(400).json({ erreur: message})
              })    
          } 

      })
      .catch(error=>{
          console.log(error)
      })

}
