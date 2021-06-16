module.exports = (sequelize, Sequelize)=>{
    const Post = sequelize.define('post',{
        titre: {
            type: Sequelize.STRING,
               },
        contenu: {
            type: Sequelize.TEXT,
                },
        gifPost :{
            type: Sequelize.STRING,
            
          },
        likes: Sequelize.INTEGER,
          

      

  });
    
    return Post
   
};