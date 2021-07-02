const express = require("express");
const path = require('path');
const cors = require("cors");
const helmet = require('helmet');
const app = express();

const usersRoutes = require('./Routes/User')
const postRoutes = require('./Routes/Post')
const profilRoutes = require('./Routes/Profil')
const commentRoutes = require('./Routes/Comment')
const likeRoutes = require('./Routes/Like')
const rolesRoutes = require('./Routes/Roles')
// Sequelize
const db =require('./models/Index');
const Role = db.role;

//db.sequelize.sync({force:true}).then(() => {
 // console.log('Synchronise');
 // initial();
//});
db.sequelize.sync()
 
// Pour la phase de développement : 
 function initial() {
    Role.create({  
      id: 1,
      name: "user" 
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
  }
//var corsOptions = {
 // origin: "http://localhost:3000"
//};
// pour les headers de mes requêtes ... voir plus tard pour modifier.CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet())
//app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api',usersRoutes);
app.use('/api',postRoutes);
app.use('/api',profilRoutes);
app.use('/api',commentRoutes);
app.use('/api', likeRoutes);
app.use('/api',rolesRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});