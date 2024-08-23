import { Request, Response } from "express"
import { check, validationResult } from 'express-validator'
import Product from "../models/Product.module"

export const createProduct = async (req : Request, res : Response) => {
  

  //Validacion
  await check('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio').run(req)

  await check('price')
  .isNumeric().withMessage('Valor no válido.')
  .notEmpty().withMessage('El Precio de Producto no puede ir vacio.')
  .custom(value => value > 0).withMessage('Precio no válido.')

  .run(req)

let errors = validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({errors: errors.array()})
}

  const product = await Product.create (req.body)
  res.json({data: product})
}