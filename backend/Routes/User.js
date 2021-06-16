const express = require('express');
const router = express.Router();
const { authJWT, verifySignUp } = require("../Middlewares");
const userCtrl = require('../Controllers/User');




router.post('/auth/register',[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],userCtrl.register);
router.post('/auth/login',userCtrl.login);



//[authJWT.verifyToken]




module.exports = router;