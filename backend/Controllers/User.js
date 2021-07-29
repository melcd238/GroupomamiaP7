const db = require("../Models");
const config = require("../config/Auth.config");
const fs = require('fs');
const User = db.user;
const Role = db.role;
const Profil = db.profil
const Post = db.post
const Comment = db.comment


const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const UserId = require('../Services/GetUserId')



// Creation du user dans la Bdd
exports.register = (req, res, next)=>{
    User.create({
        username : req.body.username,
        email: req.body.email,
        password : bcrypt.hashSync(req.body.password,10),
       
       
        })
    // si le user a un rôle: // Pour la phase de développement// Pour la production on ne garde que la partie
    // dans le else qui donne le role user et on crée une route admin pour modifier les roles.
    .then(user=>{
        if(req.body.roles){
            Role.findAll({
                where :{
                    name:{ [Op.or]:req.body.roles}
                }
            }).then(roles=>{
                user.setRoles(roles)
                .then(()=>{
                    const message = 'User enregistré avec succés'
                    return res.status(200).json({message})
                })
            })
        } else {
            user.setRoles([1])
            .then(()=>{
                const message = 'User enregistré avec succés'
                return res.status(200).json({message, user})
            })
        }

    })
    .catch(err =>{
        return res.status(500).json({message: err.message })
    })
   

};


exports.login = (req,res,next)=>{
    // on cherche le User dans la bbd
    User.findOne({
        where :{
            username : req.body.username,
       }
    })
    .then((user)=>{
        if(!user){
            const message= 'User non trouvé!'
            return res.status(404).json({message})
        }
        // on compare les password
        let passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid){
            const message = 'Password non valide'
            return res.status(401).json({message})
        }
        let token = jwt.sign({userId: user.id}, config.SECRET_TOKEN, {
            expiresIn : 86400 // 24H
        });
        // envoie du rôle dans le localStorage du front pour la session admin.
        let authorities = [];
        user.getRoles()
        .then((roles)=>{
            for(let i =0; i<roles.length; i++){
                authorities.push(roles[i].name)
            }
            return res.status(200).json({
                id: user.id,
                username: user.username,
                roles: authorities,
                accessToken: token,
                
                
            })

        })

        })
    
    .catch((error)=>{
        return res.status(500).json({message : error.message})
    })

};


// Voir l'utilisateur
exports.getOneUser = (req,res,next)=>{
    const idUser = req.params.id
    User.findOne({ where: { id: idUser }, 
                   include : [{
                       model : Profil
                   },
                   
                   {model : Post, 
                    as:"posts",
                    include : [ {model: Comment,
                        include: [{  model: User ,attributes :{exclude:['password']} ,include:[{model: Profil}]}]
                
                }]},

                     {model : Role}], 
                     attributes :{exclude:['password']},
                     order:[["posts","createdAt", "DESC"] ]
                     
                    })
        .then(user=>{
            return res.status(200).json({user})
        })
        .catch((error) => res.status(404).json({ error }))
}

// Modifier un utilisateur ( Hors password)
exports.updateOneUser = (req, res, next)=>{
    const idUser = req.params.id
    const userId =UserId(req)
    User.findOne({where : {id : idUser},attributes :{exclude:['password']},})
    .then(user=>{
        if(user.id !== userId){
            return res.status(400).json({message:"vous ne pouvez pas modifier ce User"})
        }
        user.update({username: req.body.username, email: req.body.email})
        .then(()=>{
            return res.status(200).json({message:"Paramètre User modifié avec succés"})
        })
        .catch(error=>{
            console.log(error)
            return res.status(400).json({message:"Les paramètres n'ont pas pu être modifié"})
        })
    })
    .catch(error=>{
        console.log(error)
    }) 
}
// Modifier le password  
exports.updatePassword = (req, res, next)=>{
    const userId =UserId(req)
    User.findOne({where : {id: userId}})
        .then( user=>{
            if(!user){
                return res.status(400).json({message:"vous ne pouvez pas modifier ce mot de passe"})
            }
            user.update({password:bcrypt.hashSync(req.body.password,10)})
                .then(()=>{
                    return res.status(200).json({message:"Password User modifié avec succés"})
                })
                .catch(error=>{
                    console.log(error)
                    return res.status(400).json({message:"Le password n'a pas pu être modifié"})
                })
        })
        .catch(error=> console.log(error))
}


// Supprimer un User  
exports.deleteOneUser = (req, res, next)=>{
    const userid = UserId(req)
    User.findOne({where : {id:  userid}})
        .then( user=>{
            if(user.id !== userid){
                console.log(user.id)
                return res.status(400).json({message:"vous ne pouvez pas supprimer ce User"})
            }
            })
        .then(()=>{
            Profil.findOne({where : {userId: userid}})
                  .then( profil=>{
                    if(profil.avatar !== null){
                        const fileName = profil.avatar.split('/upload/')[1];
                        fs.unlink(`upload/${fileName}`, (error => {
                            if (error){
                                return console.log(error);
                            } 
                            else {
                              return  console.log("Image supprimée: " + fileName);
                            }
                        }));
                    }

                  })
        })
        .then( ()=>{
            Post.findAll({where: {userId : userid }})
            .then( posts=>{
                for(let i=0; i < posts.length; i++){
                    if(posts[i].imageUrl){
                        const filename =posts[i].imageUrl.split('/upload/')[1];
                fs.unlink(`./upload/${filename}`, (error) => {
                    if(error){
                       return console.log(error);
                    }else {
                      return console.log("Image supprimée: " + filename);
                    }
                })

                    }

                }
            })
        })
        .then( ()=>{
            User.destroy({where : {id : userid}})
                .then(()=>{
                    return res.status(200).json({message:"Le user a été supprimé avec succés"})
                })

        })
        .catch(error=>console.log(error))
}

// Pour l'Admin : supprimer un user
exports.adminDeleteOneUser = (req, res, next)=>{
    const idUser = req.params.id
    User.findOne({where : {id:  idUser} ,include : [ {model : Role}]})
        .then( user=>{
            if(user.id !== idUser){
                console.log(user.id)
                return res.status(400).json({message:"vous ne pouvez pas supprimer ce User"})
            }
            })
        .then(()=>{
            Profil.findOne({where : {userId: idUser}})
                  .then( profil=>{
                    if(profil.avatar !== null){
                        const fileName = profil.avatar.split('/upload/')[1];
                        fs.unlink(`upload/${fileName}`, (err => {
                            if (err){
                               return console.log(err);
                            } 
                            else {
                              return  console.log("Image supprimée: " + fileName);
                            }
                        }));
                    }

                  })
        })
        .then( ()=>{
            Post.findAll({where: {userId :  idUser }})
            .then( posts=>{
                for(let i=0; i < posts.length; i++){
                    if(posts[i].imageUrl){
                        const filename =posts[i].imageUrl.split('/upload/')[1];
                fs.unlink(`./upload/${filename}`, (error) => {
                    if(error){
                        return console.log(error);
                    }else {
                        return console.log("Image supprimée: " + fileName);
                    }
                })

                    }

                }
            })
        })
        .then( ()=>{
            User.destroy({where : {id :  idUser}})
                .then(()=>{
                    return res.status(200).json({message:"Le user a été supprimé avec succés"})
                })

        })
        .catch(error=>console.log(error))
}


// Voir tous les User 
exports.getAllUsers = (req, res, next)=>{
    User.findAll({
        include:[{model : Profil },{model: Role}]
    })
     .then( allUsers =>{
         return res.status(200).json({allUsers})
     })
     .catch(error=>{
         console.log(error)
         return res.status(403).json({message : "impossible d'obtenir les Users!"})
     })
}

 