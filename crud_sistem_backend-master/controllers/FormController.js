import FormModel from "../models/FormModel.js";

/* Metodos Crud */

//Mostrar datos

export const getAllData = async (req, res) => {
    try {
        const datos = await FormModel.findAll({
            order: [['consecutivo', 'DESC']],
        })
        res.json(datos)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Mostrar datos ordenados 

export const getAllDataASC = async (req, res) => {
    try {
        const datos = await FormModel.findAll({
            order: [['id', 'DESC']],
        })
        res.json(datos)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Mostrar 1 dato
export const getDato = async(req, res) => {
    try {
        const dato = await FormModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(dato[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crea un dato

export const createDato = async (req,res) =>{
    try {
        console.log("PASS BY ALL DATA", req.body)
        await FormModel.create(req.body)
        res.json({
            "message":'Registro ingresado correctamente'
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro

export const updateDato = async (req, res) =>{
    try {
        await FormModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            "message":'Registro actualizado correctamente'
        })
    }catch(error){
        res.json({ message: error.message })
    }
}


//Eliminar un registro

export const deleteDato = async (req, res) =>{
    try {
        await FormModel.destroy({
            where: { id : req.params.id }
        })
        res.json({
            "message":'Registro eliminado correctamente'
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obetener 1 solo registro

export const getConsecutivo = async (req, res) => {
    try {
        const datos = await FormModel.findAll({
            attributes: ['consecutivo'],
            order: [['id', 'DESC']],
            limit : 1
        })
        res.json(datos)
    } catch (error) {
        res.json({ message: error.message })
    }
}