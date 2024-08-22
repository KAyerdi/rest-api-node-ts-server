import { Request, Response } from "express"
import { check, validationResult } from 'express-validator'
import Product from "../models/Product.module"

export const createProduct = async (req : Request, res : Response) => {
  

  //Validacion
  await check('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio').run(req)

let errors = validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({errors: errors.array()})
}

  const product = await Product.create (req.body)
  res.json({data: product})
}