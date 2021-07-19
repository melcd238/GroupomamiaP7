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
    const liked = 1;
  
    
   Post.findOne({where : {id : idPost}})
       .then(postFound=>{
           if(!postFound){
            return res.status(404).json({ message: "Post introuvable !" });
           }
           User.findOne({where : {id : idUser}})
               .then( userFound=>{
                   if(!userFound){
                     return res.status(404).json({ message: "User introuvable !" }); 
                   }
                   Like.findOne({where: {userId:userFound.id, postId:postFound.id}})
                        .then( likeFound=>{
                            if(!likeFound){
                                Like.create({
                                    userId:userFound.id,
                                    postId:postFound.id,
                                    isLike: liked,
                                })
                                .then(like=>{
                                    postFound.update({nbrlike : postFound.nbrlike + 1 })
                                    return res.status(201).json({postFound})
                                })
                                .catch(error=>{
                                    return res.status(400).json({error})
                                })
                            }
                            else if( likeFound){
                                Like.destroy({where : {userId:userFound.id, postId:postFound.id}})
                                    .then(()=>{
                                        postFound.update({nbrlike : postFound.nbrlike -1 })
                                        return res.status(201).json({postFound})
                                    })
                                    .catch(error=> console.log(error))
                            }
                        })
                       .catch(error=> console.log(error))
               })
               .catch(error=> console.log(error))
       })
       .catch(error=> console.log(error))

}