const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario'); 


const usuariosGet = async(req = request,res = response) => {
    const {limite = 5, desde = 0} = req.query;

    const usuarios = await Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite));
    res.json({                
        usuarios
    })
}

const usuariosPost = async (req,res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guarda la data en la bd
    await usuario.save(); 

    res.json(usuario)
}

const usuariosPut = async (req,res = response) => {
    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //TODO: validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}

const usuariosDelete = (req,res = response) => {
    res.json({                
        msg: "DELETE API -Controlador"
    })
}

const usuariosPatch = (req,res = response) => {
    res.json({                
        msg: "PATCH API -Controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}