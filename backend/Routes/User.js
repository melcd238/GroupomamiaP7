const express = require('express');
const router = express.Router();
const { authJwt, verifySignUp } = require("../Middlewares");
const userCtrl = require('../Controllers/User');




router.post('/auth/register',[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],userCtrl.register);
router.post('/auth/login',userCtrl.login);
router.put('/auth/user/updateOneUser/:id',[authJwt.verifyToken],userCtrl.updateOneUser)
router.delete('/auth/user/deleteOneUser/:id',[authJwt.verifyToken],userCtrl.deleteOneUser)
router.get('/auth/user/getOneUser/:id',[authJwt.verifyToken], userCtrl.getOneUser)
router.get('/auth/user/getAllUsers',[authJwt.verifyToken], userCtrl.getAllUsers)



// Route pour l'admin
router.delete('/auth/user/admin/deleteOneUser/:id',[authJwt.verifyToken, authJwt.isAdmin],userCtrl.adminDeleteOneUser)





module.exports = router;