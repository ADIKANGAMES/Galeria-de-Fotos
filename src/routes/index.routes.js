// Tiene las rutas/ metodos a usar

const { Router } = require('express'); // Se extrae el metodo 'Router'
const router = Router(); // Creacion de objeto para definir rutas o URL para el servidor


const{ renderIndex, renderAbout } = require('../controllers/index.controllers')// IMportamos la carpeta index.controllers para hacer uso de las funciones
router.get('/', renderIndex ); // Sus funciones de encuentran en la carpeta indexcontrollers

router.get('/about',renderAbout);// Sus funciones de encuentran en la carpeta indexcontrollers
// get es para pedir
// post para recibir


module.exports = router;  // Se expresa el 'Router'

