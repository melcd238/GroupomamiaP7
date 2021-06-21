const config = require("../Config/Db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: 'localhost',
    dialect:'mysql',
    port:'3306'
  }
);

sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((err) => {
    console.log('Unable to connect to the database:', err);
});  

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/User.js")(sequelize, Sequelize);
db.role = require("../models/Role.js")(sequelize, Sequelize);
db.profil = require('../Models/Profil')(sequelize, Sequelize);
db.post = require('../Models/Post')(sequelize, Sequelize);
db.comment = require ('../Models/Comment')(sequelize, Sequelize);
db.like = require('../Models/Like')(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
  db.user.hasOne(db.profil,{
    onDelete : "cascade"
  })
  db.profil.belongsTo(db.user,{
    foreignKey: "userId",
  })
  db.post.belongsTo(db.user, {
    foreignKey:{
      name:"userId",
      allowNull: false
     }
  });
  db.user.hasMany(db.post,{
    onDelete : "cascade"
   });
  db.post.hasMany(db.comment,{
    onDelete:"cascade"
  }); 
  db.comment.belongsTo(db.post,{
    foreignKey:{
      name: "postId",
      allowNull: false
    }
    
  });
  db.user.hasMany(db.comment,{
    onDelete:"cascade"
  });
  db.comment.belongsTo(db.user,{
    foreignKey:{
      name:"userId",
      allowNull: false
     }
  });
  db.like.belongsTo(db.post, { 
    foreignKey: "postId", onDelete: "CASCADE" 
  });
  db.like.belongsTo(db.user, { 
  foreignKey: "userId", onDelete: "CASCADE" 
});


  db.ROLES = ["user", "admin"];

module.exports = db;
