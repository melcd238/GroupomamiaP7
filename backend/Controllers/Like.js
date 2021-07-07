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
    
   Post.findOne({where : { id: idPost}})



}
       



