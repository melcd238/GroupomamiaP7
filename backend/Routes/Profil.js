const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");
const Multer = require('../Middlewares/MulterConfig')

const profilCTRL = require('../Controllers/Profil');

router.post('/auth/user/createProfil',[authJwt.verifyToken], Multer ,profilCTRL.createProfilUser)




module.exports = router;