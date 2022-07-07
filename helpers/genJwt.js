const jwt = require('jsonwebtoken');


const genJWT = ( uid = '' ) => {

  return new Promise(( resolve, reject ) => {
    const payload = { uid };

    jwt.sign( payload, process.env.SECRETKEY, {
      expiresIn: '12h'
    }, ( err, token ) => {
      if ( err ){
        console.log( 'error jwt', err );
        reject('Token Failed');
      } else {
        resolve( token );
      }

    });


  });
};

module.exports = {
  genJWT
};