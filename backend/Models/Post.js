module.exports = (sequelize, Sequelize)=>{
    const Post = sequelize.define('post',{
        titre: {
            type: Sequelize.STRING,
               },
        contenu: {
            type: Sequelize.STRING,
                },
        imageUrl :{
            type: Sequelize.STRING,
            
          },
        likes: {
            type: Sequelize.INTEGER,
        },
        nbrComment: {
            type: Sequelize.INTEGER,
        }
          

      

  });
    
    return Post
   
};