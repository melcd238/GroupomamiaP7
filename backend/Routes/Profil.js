const express = require('express');
const router = express.Router();
const { authJwt} = require("../Middlewares");
const Multer = require('../Middlewares/MulterConfig')

const profilCTRL = require('../Controllers/Profil');

router.post('/auth/user/createProfil/:id',[authJwt.verifyToken], Multer ,profilCTRL.createProfilUser)
router.put('/auth/user/updateProfilUser/:id',[authJwt.verifyToken], Multer ,profilCTRL.updateProfilUser) 
router.get('/auth/user/getProfilUser/:id',[authJwt.verifyToken], Multer ,profilCTRL.getProfilUser) 




module.exports = router;