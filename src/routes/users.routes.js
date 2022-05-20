// Ruta para el usuario
const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderSignInForm, signup, signin, logout } = require('../controllers/users.controllers') // IMportamos la carpeta index.controllers para hacer uso de las funciones

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup); // Se usan con el formulario 

router.get ('/users/signin', renderSignInForm);

router.post('/users/signin', signin); // Se usan con el formulario 

router.get ('/users/logout', logout ); // para cuando quieran salir

module.exports = router;
