const User = require('../models/userModel');

const idRegistered = async( id ) => {
  // Verify id
  const userFound = await User.findById(id);
  if ( !userFound ) {
      throw new Error(`Not found ${ id }`);
  }
}

module.exports = {
  idRegistered
};