module.exports = (sequelize, Sequelize)=>{
    const Profil = sequelize.define('profils',{
       
          avatar:{
            type: Sequelize.STRING,
          },
          bio: {
            type: Sequelize.STRING,
          }
  });
    
    return Profil
   
};