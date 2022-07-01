const express = require('express');
const cors = require('cors');
const { databaseConnection } = require('../config/database');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/';  
    
    this.conectarDB();
    this.middlewares();
    this.routes();
  };

  async conectarDB(){
    await databaseConnection();
  };

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json() );
    this.app.use( express.static('public') );
  };

  routes(){
    this.app.use( this.usersPath, require('../routes/user') );
  };

  listen(){
    this.app.listen(this.port, () => {
      console.log(`localhost/port: ${this.port}`);
    });
  };

};

module.exports = Server;