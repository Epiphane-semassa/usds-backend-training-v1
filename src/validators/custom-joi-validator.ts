import {JoiHandle} from "../configs/joi-config";

export const validateProductWithJoi = JoiHandle.object( {
    nom: JoiHandle.string().required().messages({
        'string.empty': 'Le nom du produit est requis',
        'any.required': 'Le nom du produit est requis'
    }),
    description: JoiHandle.string().optional(),
    prix: JoiHandle.number().positive().min(1).required(),
    stock: JoiHandle.number().integer().min(0).required()
});