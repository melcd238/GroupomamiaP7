module.exports = (sequelize, Sequelize)=>{
    const Like = sequelize.define('like',{
       
        id:{
           allowNull: false, 
           type:Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement:true,
        },
        userId :{
            allowNull: false, 
            type: Sequelize.INTEGER,
            reference:{
                model: "users",
                key:"id"
            }
          },
        postId : {
            allowNull: false, 
            type: Sequelize.INTEGER,
            reference:{
                model: "posts",
                key:"id"
            }
        }  
       
          
  });
    
    return Like
   
};