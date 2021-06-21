const db = require("../models");
const fs = require('fs');
const { profil } = require("../models");
const User = db.user;
const Profil = db.profil;

// Création du profil.
exports.createProfilUser = (req,res,next) =>{
    User.findOne(req.body.userId)
    .then(userFound=>{
        if(!userFound){
            const message = "Le User n'existe pas"  
            return res.status(400).json({ erreur: message})
        }else{
            Profil.create({
                bio: req.body.bio,
                avatar: req.file ? `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`: null
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
exports.getProfilUser = (req,res,next)=>{
     
}

// modification du profil
exports.updateProfilUser = (req,res,next)=>{

}

// suppression du user et de son profil
exports.deleteUserProfilUser = (req, res, next)=>{

}