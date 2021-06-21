const express = require('express');
const router = express.Router();
const { authJwt, verifySignUp } = require("../Middlewares");
const userCtrl = require('../Controllers/User');




router.post('/auth/register',[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],userCtrl.register);
router.post('/auth/login',userCtrl.login);
router.get('/auth/user/getOneUser/:id',[authJwt.verifyToken], userCtrl.getOneUser)



//[authJWT.verifyToken]




module.exports = router;