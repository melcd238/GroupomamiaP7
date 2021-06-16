module.exports = (sequelize, Sequelize)=>{
    const Comment = sequelize.define('comment',{
       
          contenu :{
            type: Sequelize.TEXT,
          } 
  });
    
    return Comment
   
};