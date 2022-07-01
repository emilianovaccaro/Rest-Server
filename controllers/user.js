const { response } = require('express');
const User = require('../models/userModel');

const getUser = ( req, res = response ) => {
    const params = req.query;
    res.json({
        msg:' get API - Controlador '  
    });
};


const postUser = async ( req, res = response ) => {
    const body = req.body;
    const user = new User( body );
    await user.save();

    res.json( user );
};

const putUser = ( req, res = response ) => {
    const id = req.params.id;

    res.json({
        msg:' put API - Controlador '  
    })
};

const patchUser = ( req, res = response ) => {
    res.json({
        msg:' patch API - Controlador '  
    })
};

const deleteUser = ( req, res = response ) => {
    res.json({
        msg:' delete API - Controlador '  
    })
};


module.exports = {
    getUser, 
    postUser,
    putUser,
    patchUser,
    deleteUser
};