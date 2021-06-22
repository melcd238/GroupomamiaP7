const db = require("../models");
const fs = require('fs');
const { post } = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment
const UserId = require('../Services/GetUserId')



// Creation d'un Post 
exports.createPost=(req,res,next)=>{
    // Rajouter une condition pour qu'au moins le champs file et contenu soit rempli.
            Post.create({
                titre: req.body.titre,
                contenu: req.body.contenu,
                gifPost: req.file ? `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`: null, 
                userId : UserId(req),
                likes: 0,
                nbrComment: 0
            }).then(post=>{
                return res.status(201).json({post})
            }).catch(error=>{
                console.log(error)
                return res.status(404).json({message: "Impossible de créer un Post!"})    
            })
 }
    


// Modifier un Post 
exports.updatePost=(req,res,next)=>{ 
    const id = req.params.id;

     Post.findOne({ where: { id: id } })

          .then(post=>{
              if(!post){
                const message = "Le post n'existe pas"
                return res.status(400).json({ erreur: message})
              } 
              if(post.userId ===  UserId(req)){
                if (req.file){
                    if (post.gifPost !== null){
                        const fileName = post.gifPost.split('/upload/')[1];
                        fs.unlink(`upload/${fileName}`, (err => {
                            if (err) console.log(err);
                            else {
                                console.log("Image supprimée: " + fileName);
                            }
                        }));
                    }
                    req.body.gifPost = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
                  }
                  post.update( { ...req.body, id: req.params.id} )
                  .then((newPost)=>{
                    const message = 'Le post a bien été modifié'
                    return res.status(200).json({ message, newPost}) 
                  })
                  .catch(error=>{
                    const message = "le post n'a pas pu être modifié"
                    return res.status(400).json({ erreur: message})
                  })    
              }else {
                const message = "Modification non autorisée!"
                 return res.status(401).json({ message});
               } }) 
               .catch(error =>{
                   console.log(error)
               }) 
        }
   
        


// Supprimer un post 
exports.deletePost = (req, res, next)=>{
    const id = req.params.id;
    Post.findOne({where : {id: id}})
             .then( post =>{
                if(post.userId === UserId(req)){
                    if (post.gifPost !== null){
                        const fileName = post.gifPost.split('/upload/')[1];
                        fs.unlink(`upload/${fileName}`, (err => {
                            if (err) console.log(err);
                            else {
                                console.log("Image supprimée: " + fileName);
                            }
                        }));
                    }
                    Post.destroy({where : {id : id}})
                    .then(()=>{
                        const message = 'Le post a bien été supprimé'
                        return res.status(200).json({ message}) 
                    })
                    .catch(error=>{
                        const message = "le post n'a pas pu être modifié"
                        return res.status(400).json({ error: message})
                    })
  
                }else{
                  const message = "Suppression non autorisée!"
                  return res.status(401).json({ message});  
                }
             })
             .catch(error=>{
                 console.log(error)
             })
             
}
// Voir 1 Post

exports.getOnePost=(req,res,next)=>{
    const id = req.params.id
    Post.findOne({ where : {id : id},
        include: [{
            model: User
        }, {
            model: Comment,
            include: [{
                model: User
            }],
        }]
    }).then(onePost =>{
        if(!onePost){
            const message = "Le Post n'existe pas "
            return res.status(400).json({ erreur: message})
        }else{
           return res.status(200).json({onePost})
        }
    })
     .catch(error=>{
        console.log(error)
        return res.status(404).json({message: "Le post ne peut pas être affiché!"})
     })
}  

// Voir tous les Posts
exports.getAllPost=(req,res,next)=>{
    Post.findAll({
        include: [{ model: User }, {
            model: Comment,
            include: [{
                model: User
            }],
        }],
        order: [[
            "createdAt", "DESC"
        ]]
    }).then(allPost=>{
        return res.status(200).json({allPost})
    }).catch(error=>{
        console.log(error)
        return res.status(404).json({message: "Il n'y a pas de message à afficher!"})
    })

}