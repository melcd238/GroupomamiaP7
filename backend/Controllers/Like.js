const db = require("../models");
const { like } = require("../models");
const User = db.user;
const Post = db.post;
const Like = db.like;
const UserId = require('../Services/GetUserId')



// Création des Likes 
exports.createLikePost = (req, res, next)=>{
    const idPost = req.params.id
    const idUser= UserId(req)
    Post.findOne({where : {id:idPost}})
        .then( post=>{
            if(!post){
                return res.status(400).json({message:"Le post n'existe pas!"})
            } else{
                Like.findOne({where :{userId: idUser, postId : idPost}})
                   .then( like=>{
                       if(!like){
                        Like.create({
                            userId: idUser,
                            postId : idPost,
                            likePost: 1})
                            .then( ()=>{
                                post.update({ likes: post.likes + 1})
                                  .then(post=>{
                                    return res.status(201).json({post})
                                  })
                                  .catch(error=>{
                                    console.log(error)
                                    return res.status(400).json({message:"Le post ne peut pas être update!"})
                                  })
                            })
                            .catch(error=>{
                                console.log(error)
                                return res.status(400).json({message:"impossible de créer le like!"})
                            })

                       }else if(like){
                           post.update({likes : post.likes -1})
                              .then( post=>{
                                   like.destroy({where :{userId: idUser, postId : idPost}})
                                       .then( ()=>{
                                        return res.status(201).json({post})
                                       })
                                       .catch(error=>{
                                        console.log(error)
                                        return res.status(400).json({message:"Le like ne peut pas être détruit!"})
                                       })
                              })
                              .catch(error=>{
                                console.log(error)
                                return res.status(400).json({message:"Le post ne peut pas être update!"})
                              })
                       }
                   })
                   .catch(error=>{
                       console.log(error)
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


