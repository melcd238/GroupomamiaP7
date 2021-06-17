const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");
const Multer = require('../Middlewares/MulterConfig')

const postCTRL = require('../Controllers/Post');



router.post('/auth/user/createPost',[authJwt.verifyToken], Multer, postCTRL.createPost);


module.exports = router;