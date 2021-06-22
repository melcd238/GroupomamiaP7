const db = require("../models");
const fs = require('fs');
const { comment, user } = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const UserId = require('../Services/GetUserId')



// Création d'un commentaire ( id du Post dans req.params.id)
exports.createComment = (req, res ,next)=>{
    const idPost = req.params.id
    const idUser = UserId(req)
    if(req.body.content === ""){
        return res.status(400).json({message:'vous devez remplir le champs pour commenter'})
    }
    else{
        Comment.create({
                    userId: idUser ,
                    postId:idPost,
                    content: req.body.content
        })
        
        Post.findOne({where:{id : idPost}})
          
           .then(post=>{
               if(!post){
                   return res.status(400).json({message:"le post n'existe pas"})
               }
               post.update({nbrComment : post.nbrComment + 1}, {id : idPost}) 
           })
           .catch(error=>{
               console.log(error)
           })
           
           .then( ()=>{
            const message = "Votre commentaire a été crée" 
            return  res.status(200).json({message})
           })
           .catch(error=>{
               console.log(error)
           })
    }
}


// Modification d'un commentaire (id du commentaire)
exports.updateComment = (req, res, next)=>{
    const idComment = req.params.id
    const idUser = UserId(req)
    Comment.findOne({where : { id : idComment}})
       .then(comment=>{
           //je verifie que c'est bien le user qui a crée le comment qui peut le modifier
           if(comment.userId != idUser){
               return res.status(403).send({message : "Vous ne pouvez pas modifier ce commentaire"})
           } else{
               if(req.body.content ===""){
                return res.status(403).send({message : "Vous devez compléter le champs"})  
               }
               return comment.update({content : req.body.content})
           }
          }) .then( ()=>{
              res.status(200).send({message: " le commentaire a été modifié avec succés!"})
          })
             .catch(error=>{
                 res.status(400).json({message : "le commentaire n'a pas pu être modifié!"})
             })
       .catch(error=>{
           console.log(error)
       })


}  
//Suppression d'un commentaire
exports.deleteComment = (req ,res ,next)=>{
    const idComment = req.params.id
    const idUser = UserId(req)
    Comment.findOne({where : { id : idComment}})
     // penser à decrementer le nbrComment dans Post 

} 
// avoir un commentaire (id du comment)
exports.getOneComment = (req, res ,next)=>{
    const idComment = req.params.id;
    Comment. findOne({where : {id : idComment}})
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
    Comment.findAll({ where : { postId : idPost}}, 
       {include: [{
            model: User
        }],
        order: [[
            "createdAt", "DESC"
        ]]
    }).then( allComments=>{
        return res.status(200).json({allComments})
    })
      .catch(error=>{
          console.log(error)
      })
 }   
    
