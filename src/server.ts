import colors from 'colors';
import express from "express";
import db from "./config/db";
import router from "./router";
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger';

//conectar a DB
export async function connectDB() {
  try{
    await db.authenticate()
    db.sync()
    //console.log(colors.yellow.bold('Conexion exitosa a la BD'))
  } catch (error){
    //console.log(error)
    console.log(colors.red.bold ('Hubo un error al conectar a la BD'))
  }
}

connectDB()

//Instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use('/api/products/', router)

//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec) )


export default server
