const express = require('express');
const router = express.Router();
const { authJwt, verifySignUp } = require("../Middlewares");
const rolesCtrl = require('../Controllers/Roles.js');



router.get('/auth/user/getAllUsersRoles',[authJwt.verifyToken], rolesCtrl.getAllUsersRoles)









module.exports = router;