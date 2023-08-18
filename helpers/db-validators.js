const Role  = require('../models/role');
const Usuario = require('../models/usuario'); 

//Valida si el role es valido (existe en la BD)
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD.`)
    }
}

//Valida si el correo existe en la BD
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El ${correo} ya existe en la BD.`)
    }
}

//Valida si el Id del usuareio existe en la BD
const existeUsuarioPorID = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El ${id} no existe en la BD.
        `)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID
}