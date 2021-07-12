module.exports = (sequelize, Sequelize)=>{
    const Post = sequelize.define('posts',{
        titre: {
            type: Sequelize.STRING,
               },
        contenu: {
            type: Sequelize.STRING,
                },
        imageUrl :{
            type: Sequelize.STRING,
            
          },
        nbrlike: {
            type: Sequelize.INTEGER,
        },
        nbrComment: {
            type: Sequelize.INTEGER,
        }
          

      

  });
    
    return Post
   
};