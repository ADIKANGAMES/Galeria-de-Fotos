// Guarda las funciones de la capeta routes

const indexCtrl ={};

indexCtrl.renderIndex=(req, res)=>{ // Muestra en pantalla el HTML de la barra lateral de arriba
    res.render('index')
};

indexCtrl.renderAbout=(req, res)=>{ // Muestra en pantalla el HTML de la barra lateral de arriba
    res.render('about')
};
module.exports = indexCtrl;  // Se exporta el 'indexCtrl'
