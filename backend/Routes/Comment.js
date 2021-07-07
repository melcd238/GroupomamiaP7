const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");


const commentCTRL = require('../Controllers/Comment');

router.post('/auth/user/post/createComment/:id',[authJwt.verifyToken],  commentCTRL.createComment) // id du post 
router.put('/auth/user/post/updateComment/:id',[authJwt.verifyToken],  commentCTRL.updateComment) // id du commenttaire
router.delete('/auth/user/post/deleteComment/:id',[authJwt.verifyToken],  commentCTRL.deleteComment) // id du commenttaire



// Route pour l'admin suppression d'un commentaire 
router.delete('/auth/user/post/admin/deleteComment/:id',[authJwt.verifyToken, authJwt.isAdmin],  commentCTRL.adminDeleteComment) 



 








module.exports = router;