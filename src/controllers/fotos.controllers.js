const fotosCtrl={};
const Photo = require ('../models/Photo');
const cloudinary = require('cloudinary');  // Requiero el modulo de Claudinary

cloudinary.config({ // Objeto de configuracion cloudinary
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Nombre de la nube
    api_key: process.env.CLOUDINARY_API_KEY, // 
    api_secret: process.env.CLOUDINARY_API_SECRET //
});

const fs = require('fs-extra'); // Modulo permite trabajar un archivo en la pc, eliminar, modificar, etc
const req = require('express/lib/request');
//const { setRandomFallback } = require('bcryptjs');

//Mostrar
fotosCtrl.MostrarFoto =async (req, res) => {  // Muestra las imagenes
        const photos = await Photo.find({user: req.user.id}); // Trae todas las fotos almacenadas en mongodb
        res.render('fotos/images', { photos });
};

fotosCtrl.renderFotoForm =async (req, res) => { // Permite  rederizar esta vista para pintar un formulario
        const photos = await Photo.find({user: req.user.id}); // Trae todas las fotos almacenadas en mongodb
        res.render('fotos/image_form', { photos }); // Se denomina el archivo a pintar
};
//Crear
fotosCtrl.createFotoForm = async (req, res) =>{
    const { title, description } = req.body; // Extrae y guarda el titulo y descripcion de cada foto
    const result = await cloudinary.v2.uploader.upload(req.file.path); // Utilizacion de la version 2 de la biblioteca de claudinary
    const newPhoto = new Photo({                                         // y para subur una imagen a claudinary      
        title,
        description,
        imageURL: result.url,  // Se almacena la direccion de la imagen de claudinary
        public_id: result.public_id // 
    });
    newPhoto.user =req.user.id;
    console.log(newPhoto);
    await newPhoto.save(); // Guardar en la base de datos
    await fs.unlink(req.file.path); // Quiero su metodo unlink para eliminar la iamgen de la direccion local (pc)
    res.redirect('/images');
    //res.send('');
};


//Eliminar
fotosCtrl.delateFoto =async (req, res) => { // Metodo para eliminar las imagenes
        const { photo_id } = req.params; // S e extrae la ID de la foto
        const photo = await Photo.findByIdAndDelete(photo_id); // Busca la ID de la fotot y lo elimine
        const result = await cloudinary.v2.uploader.destroy(photo.public_id); // Elimina la foto de Claudinary con la ID de la foto
        console.log(result); // Mestra el resultado
        req.flash('listo','Eliminado');
        res.redirect('/images/add');  // Redirecci
};


module.exports = fotosCtrl;