const { Router } = require('express');
const { check } = require('express-validator');

const { idRegistered } = require('../helpers/dbValidation');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { validateJWT } = require('../middlewares/validateJwt');

const { getUser, putUser, postUser, deleteUser, patchUser } = require('../controllers/user');
const router = Router();

router.get('/', getUser );

router.put('/:id',[
  check('id', 'Not valid ID').isMongoId(),
  check('id').custom( idRegistered ), 
  fieldValidation
], putUser);

router.post('/', [
  check( 'name', 'The field NAME is required' ).not().isEmpty(),
  check( 'password', 'The field PASSWORD must be at least 6 characters' ).isLength({
    min: 6
  }),
  check( 'email', 'The field EMAIL is required' ).isEmail(),
  fieldValidation

], postUser );

router.delete('/:id', [
  validateJWT,
  check('id', 'Not valid ID').isMongoId(),
  check('id').custom( idRegistered ), 
  fieldValidation
], deleteUser );


module.exports = router;