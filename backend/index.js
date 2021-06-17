const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const app = express();

const usersRoutes = require('./Routes/User')
const postRoutes = require('./Routes/Post')
// Sequelize
const db =require('./models/Index');
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });

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
//app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api',usersRoutes);
app.use('/api',postRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});