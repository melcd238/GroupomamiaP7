exports.createLikePost = (req, res, next)=>{
    const idPost = req.params.id
    const idUser= UserId(req)
    User.findOne({where : {id:idUser}})
         .then((user)=>{
             if(!user)
             return res.status(400).json({message:"user n'ont trouvé"})
         })
         Post.findOne({where : {id:idPost}})
         .then( post=>{
             if(!post){
                 return res.status(400).json({message:"Le post n'existe pas!"})
             } else{
                 Like.findOne({where :{userId: idUser, postId : idPost}})
                    .then( like=>{
                        if(!like){
                         Like.create({
                             userId: user.id,
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
                                    like.destroy({where :{userId: user.id, postId : idPost}})
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
 
 

         .catch(error=>{
             console.log(error)
         })
   

}  