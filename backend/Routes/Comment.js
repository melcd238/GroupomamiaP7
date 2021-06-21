const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");
const Multer = require('../Middlewares/MulterConfig')

const commentCTRL = require('../Controllers/Comment');

router.post('/auth/user/post/createComment/:id',[authJwt.verifyToken], Multer, commentCTRL.createComment) // id du post 
router.put('/auth/user/post/updateComment/:id',[authJwt.verifyToken], Multer, commentCTRL.updateComment) // id du commenttaire
router.delete('/auth/user/post/deleteComment/:id',[authJwt.verifyToken], Multer, commentCTRL.deleteComment) // id du commenttaire
router.get('/auth/user/post/getOneComment/:id',[authJwt.verifyToken], Multer, commentCTRL.getOneComment) // id du commenttaire
router.get('/auth/user/post/getAllComment/:id',[authJwt.verifyToken], Multer, commentCTRL.getAllComment) // id du post





 








module.exports = router;