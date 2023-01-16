// conexion base de datos

import db from "../database/db.js";
import { DataTypes  } from "sequelize";

const FormModel = db.define('datos_agente',{
    // Cuando se usa sequilize, no se genera un campo id como llave primaria,
    // sequalize lo hace por defecto. Si la agregas generar errores de insercion.
   /*  n_consecutivo : {type: DataTypes.STRING},
    consecutivo : {type: DataTypes.INTEGER},
    agente_envia : {type: DataTypes.STRING},
    area_envia : {type: DataTypes.STRING}*/

    ticket_problema:{type: DataTypes.STRING},
    ticket_envio:{type: DataTypes.STRING},
    fecha_llegada_correspondencia:{type: DataTypes.DATE},
    n_guia:{type: DataTypes.STRING},
    fecha_salida:{type: DataTypes.DATE},
    destino:{type: DataTypes.STRING},
    usuario_orden:{type: DataTypes.STRING},
    n_contacto: {type: DataTypes.INTEGER},
    agente_envia:{type: DataTypes.STRING},
    consecutivo:{type: DataTypes.INTEGER},
    n_consecutivo: {type: DataTypes.STRING},
    area_envia : {type: DataTypes.STRING},
    equipos: {type: DataTypes.JSON},

}, {
    timestamps: false,
    freezeTableName: true,
    tableName: "datos_agente"
});

// La linea de abajo crear y actualiza la tabla -- NO BORRAR
FormModel.sync({ alter: true});

export default FormModel;