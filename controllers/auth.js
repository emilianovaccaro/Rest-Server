const { response, request } = require('express');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const { genJWT } = require('../helpers/genJwt');
const { googleVerify } = require('../helpers/googleVerify');

const loginControl = async ( req, res = response ) => {
  const { email, password } = req.body;

  try{

    const user = await User.findOne({ email });
    //is there a user with that email?
    if( !user ){
      return res.status(400).json({ msg:'Incorrect email' });
    }
    //what's user state? true/false
    if( !user.state ){
      return res.status(400).json({ msg:'Incorrect - state false' });
    }

    //Is it a valid password? (compared to the user's pssw)
    const validPassword = bcryptjs.compareSync( password, user.password );
    if( !validPassword ){
      return res.status(400).json({ msg:'Incorrect password' });
    }

    //GENERATE JWT
    const token = await genJWT( user.id );

    res.json({ 
      user,
      token
     });

  } catch ( error ) {
    console.log(error);

    res.status(500).json({
      msg: 'Please contact the admin'
    });
  }
}

const googleSignIn = async ( req, res = response ) => {
  const { id_token } = req.body;


  try {
    const googleUser = await googleVerify( id_token );

    res.json({
      msg: 'Valid Google Sign-In',
      googleUser,
      id_token
    });

  } catch (error) {
    json.status(400).json({
      msg: 'Token not verified',
      error
    })
  }
}



module.exports = {
  loginControl,
  googleSignIn
};