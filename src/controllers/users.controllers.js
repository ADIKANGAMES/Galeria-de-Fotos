const usersCtrl = {}; // objeto
const User=  require('../models/Usuarios')// se guarda lo que se requiere de  la carpeta 'Usuarios'
const passport = require('passport'); // Requiero el archivo passport


usersCtrl.renderSignUpForm = (req, res) => {// Renderiza el formulario de registro que se encuentra en 'signup.hbs'
    res.render('users/signup');
};




// Encargada de registrar al usuario
usersCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;  // Se extraen los datos del formulario
    if (password != confirm_password) {// Validacion de passworid con confirm_password
        errors.push({ text: 'No coindicen las contraseñas ' }); // Se muestra un error
    } 
    if (password.length < 4){
        errors.push ({ text: 'La contraseña debe de contener mas de 4 caracteres.' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {// Si hyay errores  se vuelve a enviar al formulario y recibiendo los errores
            errors,
            // Se envian los datos que estan en el formulario para que se puedan editar y perder tiempo escribiendolos de nuevo
            name,
            email
   
        })
    } else {
        const emailUser= await  User.findOne({email:email}); //Busqueda para saber si el nombre y el correo del usuario ya existe
        if(emailUser){
            req.flash('error_msg', 'El correo ya esta en uso');
            res.redirect('/users/signup');//Redirecciona al formulario de registro
        } else{
           const newUser= new User ({name, email, password}); //Registra un nuevo usuario si no tiene sesion registrada 
           newUser.password = await newUser.encryptPassword (password) // Se oculta (cifra la contraseña)
           await newUser.save(); // Se guara en la base de datos
           req.flash('error_msg', 'Ya estas registrado');
           res.redirect ('/users/signin'); //Si es un nuevo usuario lo redireccionara al formulario de inicio se sesion
        }
    }
};



usersCtrl.renderSignInForm = (req, res) => {// Renderiza el formulario   para iniciar sesion que se encuentra en 'signup.hbs'
    res.render('users/signin');
};



usersCtrl.signin = passport.authenticate('local',{ //Utilizo el metodo passport para autentificar las contraseñas y correos del 'pasport'
    failureRedirect: '/users/signin',  //redireccionar al inicion de sesion
    successRedirect: '/images',  //Cuanto todo valla bien, lo redireccinare a la ruta de iamgenes
    failureFlash:true
});


usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg','Sesion Cerrada');
    res.redirect('/users/signin');

};


module.exports = usersCtrl;// Se exporta
