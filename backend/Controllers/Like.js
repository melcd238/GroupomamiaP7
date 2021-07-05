const db = require("../models");
const { like, user } = require("../models");
const User = db.user;
const Post = db.post;
const Like = db.like;
const UserId = require('../Services/GetUserId')



// Création des Likes 
exports.createLikePost = (req, res, next)=>{
    const idPost = req.params.id
    const idUser= UserId(req)
    const isLiked = req.body.like
   Post.findOne({where : { id: idPost}})
       .then(post=>{
           if(!post){
               return res.status(404).json({message:"le post n'existe pas"})
           }else if( isLiked){
               Like.create({
                   userId : idUser,
                   postId:idPost
               })
               .then(like=>{
                   post.update({ likes: post.likes + 1})
                     .then(post=>{
                         res.status(201).json({post})
                     })
                     .catch(error=>{
                         console.log(error)
                         return res.status(500).json({message:"le post n'a pas pu être modifié"})
                     })
               })
               .catch(error=>{
                   console.log(error)
               })
           }else if(!isLiked){
               Like.destroy({where :{
                   userId:idUser,
                   postId:idPost
               }})
               .then( like=>{ 
                   post.update({likes : post.likes -1})
                    .then( post=>{
                        return res.status(201).json({post})
                    })
                    .catch(error=>{
                        console.log(error)
                         return res.status(500).json({message:"le post n'a pas pu être modifié"})
                    })
               })
               .catch(error=>{
                   console.log(error)
                 return  res.status(400).json({message: "Like n'a pas pu être détruit"})
               })
           }


       })
       .catch(error=>{
           console.log(error)
       })
     
   

}  
// Obtenir les likes pour un Post et les utilisateurs qui ont liké
exports.getLikesPost = (req, res, next)=>{
    const idPost = req.params.id 
     Like.findAll({where : {id :idPost }, include:[{ model : User }]})
      .then( likes=>{
          return res.status(200).json({likes})
      })
      .catch(error=>{
          console.log(error) 
          return res.status(400).json({message:"Impossible de récupérer les likes"})
      })
} 


