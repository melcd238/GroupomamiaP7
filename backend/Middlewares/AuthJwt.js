const jwt = require('jsonwebtoken');
const config = require('../config/Auth.config');
const db = require('../Models');
const User = db.user;

// on verifie qu'il y a un token 
verifyToken = (req,res,next)=>{
  try {
    const token = req.headers["x-access-token"];
    if(!token){
      const message = `No Token provided`
      return res.status(403).json({message});
     }
     const decodedToken = jwt.verify(token,config.secret);
     const userId = decodedToken.userId
     if (req.body.userId && req.body.userId !== userId) {
      const message = `User ID non valable`
      return res.status(403).json({message});
  
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
    User.findOne(req.userId)
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
