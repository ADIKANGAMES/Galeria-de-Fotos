// Validaciones de los usuarios creados para ingresar a la app

const passport = require ('passport');//importa el modulo ´passport
const LocalStrategy = require ('passport-local').Strategy;
const User = require ('../models/Usuarios');

passport.use(new LocalStrategy({ 
    usernameField :'email', //Recibo el correo del 'signin'
    passwordField : 'password'
}, async (email, password, done) =>{ //Valida los datos con la base de datos

    // Conprobar si existe el correo del usuario
    const user = await User.findOne ({email}) // Busca el correo en la base de datos
    //Validacion del correo
    if(!user){
        return done( null, false, {message :'No existe el Usuario'});
    } else {
        // Validacion de la contraseña
       const match =await user.matchPassword(password); // Compara la contraseña del formulario con la de la base de datos
       if(match){
           return done(null, user);
       } else{
           return done(null, false, {message:'Contraseña Incorrecta'});
       }
    }
}));
passport.serializeUser((user, done)=>{ 
    done(null, user.id);
});
// Si encuentra los datos va a dejar acceder a la sesion
passport.deserializeUser((id, done)=>{
    User.findById (id, (err, user)=>{
      done(err, user);  
    }) //busca por ID
});// Recibe el usuario o un error de el