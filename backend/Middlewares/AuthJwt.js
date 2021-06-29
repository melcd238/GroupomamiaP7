const jwt = require('jsonwebtoken');
const config = require('../config/Auth.config');
const db = require('../Models');
const User = db.user;
const UserId = require('../Services/GetUserId')

// on verifie qu'il y a un token 
verifyToken = (req,res,next)=>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    if(!token){
      const message = `No Token provided`
      return res.status(403).json({message});
     }
     const decodedToken = jwt.verify(token,config.SECRET_TOKEN);
     console.log(decodedToken)
     const userId = decodedToken.userId
     console.log(userId)
     if (req.body.userId && req.body.userId !== userId) {
      throw 'ID utilisateur non valable';
  
    } else {
      req.user = decodedToken;
      
      next();
      
    }
    
  } catch (error) {
    const message = 'Requête non authentifiée!'
    res.status(401).json({
      error: message
    }) 
  }
}
   
    



isAdmin = (req, res, next) => {
  const idUser = UserId(req)
    User.findOne({where: {id:idUser}})
    .then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({message: "Require Admin Role!" }); 
       
      });
    });
  };

const authJWT ={
    verifyToken : verifyToken,
    isAdmin : isAdmin

}

module.exports = authJWT;
