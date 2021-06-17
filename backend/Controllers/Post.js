const db = require("../models");
const fs = require('fs');
const User = db.user;
const Post = db.post;




exports.createPost=(req,res,next)=>{
    User.findOne(req.body.id)
    .then(userFound=>{
        if(!userFound){
            const message = "Le User n'existe pas"  
            return res.status(400).json({ erreur: message})
        }else{
            Post.create({
                titre: req.body.titre,
                contenu: req.body.contenu,
                gifPost: req.file ? `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`: null,
                userId : userFound.id,
                likes: 0,
                nbrComment: 0
            }).then(newPost=>{
                return res.status(201).json({newPost})
            }).catch(error=>{
                console.log(error)
                return res.status(404).json({message: "Impossible de créer un Post!"})   
            })
        }
    })

}