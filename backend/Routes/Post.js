const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");
const Multer = require('../Middlewares/MulterConfig')

const postCTRL = require('../Controllers/Post');



router.post('/auth/user/createPost',[authJwt.verifyToken], Multer, postCTRL.createPost);
router.get('/auth/user/getAllPost',[authJwt.verifyToken], Multer, postCTRL.getAllPost);
router.put('/auth/user/updatePost/:id',[authJwt.verifyToken], Multer,postCTRL.updatePost);
router.delete('/auth/user/deletePost/:id',[authJwt.verifyToken], Multer,postCTRL.deletePost);


// Pour l'admin Suppresion d'un Post 
router.delete('/auth/user/admin/deletePost/:id',[authJwt.verifyToken, authJwt.isAdmin], Multer,postCTRL.adminDeletePost);


module.exports = router;