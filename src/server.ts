import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import express from "express";
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import db from "./config/db";
import swaggerSpec from './config/swagger';
import router from "./router";

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

//Permitir conexiones
const corsOptions : CorsOptions = {
  origin: function(origin, callback){
    if(origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products/', router)

//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec) )


export default server
