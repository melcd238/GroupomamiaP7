const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");
const Multer = require('../Middlewares/MulterConfig')

const postCTRL = require('../Controllers/Post');



router.post('/auth/user/createPost',[authJwt.verifyToken], Multer, postCTRL.createPost);
router.get('/auth/user/getAllPost',[authJwt.verifyToken], Multer, postCTRL.getAllPost);
router.put('/auth/user/updatePost/:id',[authJwt.verifyToken], Multer,postCTRL.updatePost);
router.delete('/auth/user/deletePost/:id',[authJwt.verifyToken], Multer,postCTRL.deletePost);
router.get('/auth/user/getOnePost/:id',[authJwt.verifyToken], Multer, postCTRL.getOnePost);


module.exports = router;