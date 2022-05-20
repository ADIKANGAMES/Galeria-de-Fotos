const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const req = require('express/lib/request');
const flash = require('connect-flash'); // Para mostrar mensajes emergentes
const session = require('express-session'); // No mover ni agregar la letra que falta, si no no agarra
const passport = require ('passport');


//Inicializaciones
const app = express();
require('./database');
require ('./config/passport');  // Requiero el archivo passport


//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
   defaultLayout: 'Usrmain', //Indica  el archivo HTML donde tendra las cosas
   // defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) =>{
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(session({ // Modulo donde se guardan los mensajes flotantes
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));
// Lo que hace que funcione passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(multer({storage}).single('image'));


// Variables Globales
app.use((req, res, next)=>{
    req.flash('listo');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user = req.user || null; //Usuario autenticado
    next();
});



//Rutas
app.use(require('./routes/index.routes')); // Utilizacion del modulo de la carpeta routes
app.use(require('./routes/users.routes')); // Importamos los usuarios 
app.use(require('./routes/fotos.routes'));

module.exports = app;
