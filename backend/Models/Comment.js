module.exports = (sequelize, Sequelize)=>{
    const Comment = sequelize.define('comment',{
       
          content :{
            type: Sequelize.STRING,
          },
          userId :{
            type: Sequelize.INTEGER,
          }
          
  });
    
    return Comment
   
};