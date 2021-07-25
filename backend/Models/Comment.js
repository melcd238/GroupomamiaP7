module.exports = (sequelize, Sequelize)=>{
    const Comment = sequelize.define('comments',{
       
          content :{
            type: Sequelize.STRING,
          },
          userId :{
            type: Sequelize.INTEGER,
          },
         
        
          
  });
    
    return Comment
   
};