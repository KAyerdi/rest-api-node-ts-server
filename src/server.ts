import colors from 'colors';
import express from "express";
import db from "./config/db";
import router from "./router";

//conectar a DB
async function connectDB() {
  try{
    await db.authenticate()
    db.sync()
    console.log(colors.yellow.bold('Conexion exitosa a la BD'))
  } catch (error){
    //console.log(error)
    console.log(colors.red.bold ('Hubo un error al conetar a la BD'))
  }
}
connectDB()

//Instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use('/api/products/', router)


export default server
