const mongoose = require('mongoose');
const keys = require('./keys');

const databaseConnection = async ( ) => {
  try{
    await mongoose.connect( keys.mongoURI );
    console.log("CONECTADO A MONGODB");
  } 
  catch ( error ) {
    console.log(error);
    throw new Error("NO CONECTADO A MONGODB");
  }
};

module.exports = {
  databaseConnection
};