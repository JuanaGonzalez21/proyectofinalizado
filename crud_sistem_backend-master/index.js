import express from "express"
import cors from 'cors'

//importacion de la base de datos
import db from "./database/db.js"
import formRoutes from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/forms', formRoutes)

try {
    await db.authenticate()
    console.log('Conexion correcta')
} catch (error) {
    console.log(`Error: ${error}`)
}

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

const port = process.env.PORT || 8001
app.listen(port, () => {
    console.log('Server UP running in', port)
})