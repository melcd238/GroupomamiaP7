const db = require("../models");
const fs = require('fs');
const { comment, user } = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment


// Création d'un commentaire ( id du Post dans req.params.id)
exports.createComment = (req, res ,next)=>{
    const idPost = req.params.id
    const content = req.body.content
    User.findOne(req.body.userId) 
    .then(userFound=>{
        if(!userFound){
            const message = "Le User n'existe pas"  
            return res.status(400).json({ erreur: message})

        }else{
            if(content !== null){
                Comment.create({
                    usedId: userFound.id,
                    postId:idPost,
                    content: req.body.content
                })
                Post.findOne({where:{id : idPost}})
                 .then(post =>{
                     post.update({
                         nbrComment : post.nbrComment + 1,
                     }, {id: idPost})
                     .then( ()=>{
                        const message = "Votre commentaire a été crée" 
                       return  res.status(200).json({ message })
                     })
                     .catch(error=>{
                         console.log(error)
                     })

                 })
                 .catch(error=>{
                     console.log(error)
                 })
            }else{
                return res.status(401).json({error: "vous devez envoyer du contenu"})
            }

            
       }
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({message: "Impossible de créer un Commentaire!"})

    })

}
// Modification d'un commentaire
exports.updateComment = (req, res, next)=>{

    User.findOne(req.body.userId)
    .then(userFound=>{
        if(!userFound){
            const message = "Le User n'existe pas"  
            return res.status(400).json({ erreur: message})
        }else{
            

        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(404).json({message: "Impossible de modifier un Commentaire!"})
    })

}
//Suppression d'un commentaire
exports.deleteComment = (req ,res ,next)=>{
    User.findOne(req.body.userId)
    .then(userFound=>{
        if(!userFound){
            const message = "Le User n'existe pas"  
            return res.status(400).json({ erreur: message})
        }else{

        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(404).json({message: "Impossible de supprimer un Commentaire!"})
    })

}
// avoir un commentaire (id du comment)
exports.getOneComment = (req, res ,next)=>{
    const id = req.params.id
    Comment.findOne({where: {id : id},
        include: [{
            model: User
        }]
    })
    .then( comment=>{
        return res.status(200).json({comment})
    })
    .catch(error=>{
        console.log(error)
    })

}
// Avoir tous les commentaires pour un message (id du post )
exports.getAllComment = (req, res ,next)=>{
    const idPost = req.params.id
    Post.findOne({where : {id : idPost}})
     .then(postFound=>{
        if(!postFound){
            const message = "Le Post n'existe pas"
            return res.status(400).json({ erreur: message})
        }else{
            Comment.findAll({
                include: [{
                    model: User,
                    attributes: [ 'username' ]
                  }],
                  order: [[ "createdAt", "DESC" ]]
            }).then(allComments =>{
                return res.status(201).json({allComments})
            })
            .catch(error=>{
                const message = "Les commentaires n'ont pas pu être récupéré"
                return res.status(500).json({ erreur: message})
            })
        }

     })
     .catch(error=>{
         console.log(error)
     })
   
    
}