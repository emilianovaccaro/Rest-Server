const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { loginControl, googleSignIn } = require('../controllers/auth');


const router = Router();



router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  fieldValidation
], loginControl);


router.post('/google', [
  check('id_token', 'Token de google es necesario').not().isEmpty(),
  fieldValidation
], googleSignIn);

module.exports = router;