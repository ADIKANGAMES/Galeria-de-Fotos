//Aqui se declara los campos que va a requerir el iniicio de sesion 
const { Schema, model} = require('mongoose'); // Se le llama a la base de datos
const bcrypt= require ('bcryptjs');

// Datos que va a tener el esquema
const UserSchema= new Schema({
    name :{type: String, required:true},   //Nombre requerido
    email: {type: String, required: true, unique:true}, //Dato unico
    password: {type: String, required:true}
}, {
    timestamps: true //Fecha de creacion de usuario
});

//Creacion de metodos de cifrao de contraseñas
UserSchema.methods.encryptPassword = async password=>{ 
   const salt=  await bcrypt.genSalt(10); // V a tomar tiempo, continua con el codigo de abajo
  return await bcrypt.hash(password, salt);
};

// Para ver si la contraseña es correcta
UserSchema.methods.matchPassword=  async  function (password) {
   return await bcrypt.compare(password, this.password );
}



 module.exports= model('Usuarios', UserSchema); // Recibe dos parametros que son el nonmbre del modelo  (Photo)
 // y la constante del Schema que es User y se exporta con module.exports 
