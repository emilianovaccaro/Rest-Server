const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const validateJWT = async ( req = request, res = response, next ) => {

  const token = req.header( 'jtoken' );
  if( !token ) {
    return res.status(401).json({
      msg: 'Token not found'
    });
  }

  try { 
    const { uid } = jwt.verify( token, process.env.SECRETKEY );
    req.uid = uid;
    
    const user = await User.findById( uid );
    if ( !user ){
      return res.status(401).json({
        msg: 'Invalid Token - user does not exist. db'
      });
    }

    if ( !user.state ){
      return res.status(401).json({
        msg: 'Invalid Token - user does not exist. state'
      });
    }

    req.user = user;



    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Invalid Token'
    });
  }
};

module.exports = {
  validateJWT
};