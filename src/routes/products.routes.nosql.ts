import express from 'express';
import {Product} from "../models/products";
import {ProductModel} from "../configs/products.mongoose";
import {authenticationFilter} from "../security/auth-filter";
import {handleAdminPermissionsFilter} from "../security/handle-permissions-filter";
import {validateProductWithEV} from "../validators/custom-express-validator";
import {validateProductWithJoi} from "../validators/custom-joi-validator";

const productRouter = express();
const {validationResult} = require("express-validator");

//CREATE : Ajouter un produit
productRouter.post("", async (req, res) => {
    const product = req.body as Product;

    //Validation des champs avec express-validator
   /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }*/

    //Validation des champs avec Joi
    const {error, value} = validateProductWithJoi.validate(product);
    if (error) {
        res.status(400).json({
            errorsMessage: error.details.map(err => err.message),
        });
        return;
    }

    /* if (!product.nom || !product.prix || !product.stock) {
         res.status(400).json({message: "Les champs Nom, Prix et Stock sont requis."});
         return;
     }*/

    try {
        const productModel = new ProductModel(product);
        await productModel.save();

        res.status(201).json({message: "Produit créé avec succès !", data: productModel});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Create product failed !"});
    }
})

//RETRIEVE : Récupérer tous les produits
productRouter.get("", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Retrieve all products failed !"});
    }
})

//RETRIEVE : Récupérer un produit par son ID
productRouter.get("/:id", async (req, res) => {
    const id = req.params['id'];

    try {
        const product = await ProductModel.findById(id);

        if (!product) {
            res.status(404).json({message: "Produit non trouvé"});
            return;
        }

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Retrieve product by id failed !"});
    }
})

//UPDATE : Modifier à jour un produit
productRouter.put("/:id", async (req, res) => {
    const id = req.params['id'];
    const product = req.body as Product;

    if (!product.nom || !product.prix || !product.stock) {
        res.status(400).json({message: "Les champs Nom, Prix et Stock sont requis."});
        return;
    }

    try {
        const productModel = await ProductModel.findByIdAndUpdate(
            id,
            product,
            {new: true} //Retoune le document mis à jour
        );

        if (!productModel) {
            res.status(404).json({message: "Produit non trouvé"});
        }

        res.status(200).json({message: "Produit mis à jour !", data: productModel});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Update product failed !"});
    }
})

//DELETE : Supprimer un produit
productRouter.delete("/:id", async (req, res) => {
    const id = req.params['id'];

    try {
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({message: "Produit non trouvé"});
            return;
        }

        res.status(200).json({message: "Produit supprimé !"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Retrieve product by id failed !"});
    }
})

export const apiProductsNoSqlRouter = productRouter;
