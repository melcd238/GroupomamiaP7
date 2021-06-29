const db = require("../Models");
const config = require("../config/Auth.config");
const User = db.user;
const Role = db.role;
const Profil = db.profil
const Post = db.post


// Avoir les roles pour un user

exports.getAllUsersRoles = (req, res, next)=>{
     Role.findAll({ include : [{model : User}]})
       .then( allRoles=>{
           return res.status(200).json({allRoles})
       })
       .catch()
}