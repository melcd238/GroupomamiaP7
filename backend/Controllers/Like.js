const db = require("../models");
const { like } = require("../models");
const User = db.user;
const Post = db.post;
const Like = db.like;
const UserId = require('../Services/GetUserId')



// Création des Likes
exports.createLikePost = (req, res, next)=>{

}

// Obtenir les likes pour un Post 
exports.getLikesPost = (req, res, next)=>{

}


// Obtenir la liste des utilisateurs qui ont liké 
exports.getPostLikesUsers = (req, res,next)=>{
    
}