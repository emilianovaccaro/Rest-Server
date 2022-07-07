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
      msg: 'Please contact us'
    });
  }
}

const googleSignIn = async ( req, res = response ) => {
  const { id_token } = req.body;


  try {

    const { email, name } = await googleVerify( id_token );
    let user = await User.findOne({ email })
    //is there a user? !user => create one.
    if ( !user ){
      const data = {
        name,
        email, 
        password: ':P1',
        google: true
      };
      user = new User( data );
      await user.save();
    } 

    //is the user state false/blocked in db?
    if ( !user.state ){
      return res.status(401).json({
        msg: ' This user is no longer available, for more information please contact us '
      });
    }

    //GENERATE JWT
    const token = await genJWT( user.id );


    return res.json({
      user,
      token
    });

  } catch (error) {
    return res.status(400).json({
      msg: 'Token not verified',
      error
    })
  }
}



module.exports = {
  loginControl,
  googleSignIn
};