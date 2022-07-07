const { response } = require('express');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');


const getUser = async ( req, res = response ) => {
    const { max = 5, min = 0 } = req.query;
    const userState = { estado: true };

    const users = await User.find( userState )
    .skip( Number(min) )
    .limit( Number(max) );

    res.json({
        users
    });
};



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsdG8gQ2FwbyIsImlhdCI6MTUxNjIzOTAyMn0.5kVpKKYXrwA6m4sbtW7eEQna3rtBp9Lop9By4mxhnPU

const postUser = async ( req, res = response ) => {
    const { name, email, password } = req.body;
    const user = new User( { name, email, password } );

    //validate email
    const emailExists = await User.findOne({ email });
    if( emailExists ){
        return res.status(400).json( {
            msg: 'Mail already registered'
        });
    }

    //Hash pw
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync( password, salt );
    //save in db
    await user.save();
    res.json({
        user
    });
};

const putUser = async ( req, res = response ) => {
    const { id } = req.params;
    const { _id, password, google, ...other } = req.body;

    //Validate ID
    if( password ){ 
        const salt = bcryptjs.genSaltSync(10);
        other.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, other );

    res.json(user);
};

const deleteUser = async ( req, res = response ) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { state: false } );
    const verifiedUser = req.user;

    res.json({
        user,
        verifiedUser
    });
};


module.exports = {
    getUser, 
    postUser,
    putUser,
    deleteUser
};