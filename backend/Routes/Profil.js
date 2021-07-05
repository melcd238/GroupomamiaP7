const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");
const Multer = require('../Middlewares/MulterConfig')

const profilCTRL = require('../Controllers/Profil');

router.post('/auth/user/createProfil/:id',[authJwt.verifyToken], Multer ,profilCTRL.createProfilUser) //id du User
router.put('/auth/user/updateProfilUser/:id',[authJwt.verifyToken], Multer ,profilCTRL.updateProfilUser) //id du User





module.exports = router;