
const { Router } = require('express'); // Se extrae el metodo 'Router'
const router = Router(); // Creacion de objeto para definir rutas o URL para el servidor

const { MostrarFoto,
    renderFotoForm, 
    createFotoForm, 
    delateFoto }
    = require('../controllers/fotos.controllers');

const {isAuthenticated}=require('../helpers/auth')

const fs = require('fs-extra'); // Modulo permite trabajar un archivo en la pc, eliminar, modificar, etc
const req = require('express/lib/request');

router.get('/images',isAuthenticated, MostrarFoto);

router.get('/images/add',isAuthenticated, renderFotoForm);
// Crear foto
router.post('/images/add', isAuthenticated, createFotoForm);

//Eliminar foto
router.get('/images/delete/:photo_id',isAuthenticated,delateFoto);


module.exports = router;  // Se expresa el 'Router'
