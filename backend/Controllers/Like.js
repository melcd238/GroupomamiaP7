const db = require("../models");
const { like } = require("../models");
const User = db.user;
const Post = db.post;
const Like = db.like;
const UserId = require('../Services/GetUserId')



// Création des Likes ( Léger bug à corriger dans catch)
exports.createLikePost = (req, res, next)=>{
    const idPost = req.params.id
    const idUser= UserId(req)
    let liked = req.body.like
    Post.findOne({where : {id:idPost}})
       .then(post=>{
           if(!post){
               return res.status(400).json({message:"Le post n'existe pas!"})
           }
           Like.findOne({where :{userId: idUser, postId : idPost}}) 
              .then(like=>{
                  if(!like){
                      Like.create({
                        userId: idUser,
                        postId : idPost,
                        likePost:liked
                      })
                      .then( like=>{
                          post.update({ likes: post.likes + 1})
                          .then(post=>{
                              return res.status(201).json({post})
                          })
                          .catch(error=>{
                              console.log(error)
                              return res.status(403).json({message:"Le post n'a pas pu être modifié"})
                          })
                      })
                      .catch(error=>{
                          console.log(error)
                      })
                  }else if(like){
                      post.update({likes : post.likes -1})
                      .then(post=>{
                        return res.status(201).json({post})
                          
                      })
                      .catch(error=>{
                        console.log(error)
                        return res.status(403).json({message:"Le post n'a pas pu être modifié"})
                    })
                    Like.destroy({where :{userId: idUser, postId : idPost}})
                         .then(()=>{
                            return res.status(201).json({post})
                         })
                         .catch((error)=>{
                             console.log(error)
                         })
                  }
              })
        
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


