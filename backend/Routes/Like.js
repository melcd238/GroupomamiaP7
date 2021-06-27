const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");


const likeCTRL = require('../Controllers/Like');

router.post('/auth/user/post/createLike/:id',[authJwt.verifyToken],likeCTRL.createLikePost)// id du post 
router.get('/auth/user/post/getLikesPost/:id',[authJwt.verifyToken],likeCTRL.getLikesPost)// id du post 




module.exports = router;