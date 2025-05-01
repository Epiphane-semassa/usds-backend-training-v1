const {body} = require('express-validator');

export const validateProductWithEV = [
    body('nom')
        .notEmpty()
        .withMessage('Le nom du produit est requis')
        .isString()
        .withMessage('Le nom du produit doit être une chaîne de caractères'),
    body('description')
        .optional()
        .isString()
        .withMessage('La description doit être une chaîne de caractères'),
    body('prix')
        .notEmpty()
        .withMessage('Le prix est requis')
        .isDecimal({force_decimal: true})
        .withMessage('Le prix doit être un nombre existant et positif'),
    body('stock')
        .notEmpty()
        .withMessage('Le stock est requis')
        .isInt({ min: 0 })
        .withMessage('Le stock doit être un entier positif')
]