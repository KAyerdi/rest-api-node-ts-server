import { Router } from "express"
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 *  components:
 *       schemas:
 *          Product:
 *              type: object
 *              properties:
 *                   id:
 *                       type: integer
 *
 *
 * 
 * 
 * 
 *
 */



//Routing
router.get('/', getProducts)
router.get('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  getProductById)


router.post('/',
    //Validacion
    body('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
    .isNumeric().withMessage('Valor no válido.')
    .notEmpty().withMessage('El Precio de Producto no puede ir vacio.')
    .custom(value => value > 0).withMessage('Precio no válido.'),
  handleInputErrors,
  createProduct
)
router.put('/:id',
      param('id').isInt().withMessage('ID no valido'),
      body('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

      body('price')
      .isNumeric().withMessage('Valor no válido.')
      .notEmpty().withMessage('El Precio de Producto no puede ir vacio.')
      .custom(value => value > 0).withMessage('Precio no válido.'),
  body('availability')
  .isBoolean().withMessage('Valor para disponibilidad no valido'),
  handleInputErrors,
  updateProduct
)

router.patch('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  updateAvailability
)

router.delete('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  deleteProduct
)
export default router