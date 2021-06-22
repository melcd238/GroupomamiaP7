const db = require("../Models");
const config = require("../config/Auth.config");
const User = db.user;
const Role = db.role;


const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");



// Creation du user dans la Bdd
exports.register = (req, res, next)=>{
    User.create({
        username : req.body.username,
        email: req.body.email,
        password : bcrypt.hashSync(req.body.password,10),
       
       
        })
    // si le user a un rôle:
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
        let token = jwt.sign({userId: user.id}, config.SECRET, {
            expiresIn : 86400 // 24H
        });
        let authorities = [];
        user.getRoles()
        .then((roles)=>{
            for(let i =0; i<roles.length; i++){
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
            return res.status(200).json({
                id: user.id,
                username: user.username,
                roles: authorities,
                accessToken: token,
                
                
            })

        })
    })
    .catch((err)=>{
        return res.status(500).json({message : err.message})
    })

};

// Voir l'utilisateur
exports.getOneUser = (req,res,next)=>{
    User.findOne({ where: { id: req.params.id } })
        .then(user=>{
            return res.status(200).json({user})
        })
        .catch((error) => res.status(404).json({ error }))
}

