//Configuracion de la conexion a la base datos mongodb
require('dotenv').config()
const config = {
    mongo: {
        url: process.env.URL,
        database: process.env.DB,
        collection: process.env.COLLECTION
    }
}

module.exports = config;