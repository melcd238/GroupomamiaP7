module.exports = (sequelize, Sequelize)=>{
    const Profil = sequelize.define('profil',{
       
          avatar:{
            type: Sequelize.STRING,
          },
          bio: {
            type: Sequelize.STRING,
          }
  });
    
    return Profil
   
};