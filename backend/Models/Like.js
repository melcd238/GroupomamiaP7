module.exports = (sequelize, Sequelize)=>{
    const Like = sequelize.define('like',{
       
        likePost:{
           type:Sequelize.INTEGER,
        }
       
          
  });
    
    return Like
   
};