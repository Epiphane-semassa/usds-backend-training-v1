import express from 'express';
import {sql_db_pool_promise} from "../configs/sql_db";
import {Product} from "../models/products";

const productRouter = express();

//CREATE : Ajouter un produit
productRouter.post("", async (req, res) => {
    const product = req.body as Product;

    if (!product.nom || !product.prix || !product.stock) {
        res.status(400).json({message: "Les champs Nom, Prix et Stock sont requis."});
        return;
    }

    try {
        const sql_request = "INSERT INTO products (nom, description, prix, stock) VALUES (?, ?, ?, ?)";
        const [result] = await sql_db_pool_promise.execute(
            sql_request,
            [product.nom, product.description, product.prix, product.stock]
        );

        res.status(201).json({message: "Produit créé avec succès !", id: result['insertId']});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Create product failed !"});
    }
})

//RETRIEVE : Récupérer tous les produits
productRouter.get("", async (req, res) => {
    try {
        const sql_request = "SELECT * FROM products";
        const [result] = await sql_db_pool_promise.execute(sql_request);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Retrieve all products failed !"});
    }
})

//RETRIEVE : Récupérer un produit par son ID
productRouter.get("/:id", async (req, res) => {
    const id = req.params['id'];

    try {
        const sql_request = "SELECT * FROM products WHERE id = ?";
        const [result] = await sql_db_pool_promise.execute(sql_request, [id]);

        if (result['length'] == 0) {
            res.status(404).json({message: "Produit non trouvé"});
            return;
        }
        res.status(200).json(result[0]);
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
        const sql_request = "UPDATE products SET nom = ?, description = ?, prix = ?, stock = ? WHERE id = ?";
        const [result] = await sql_db_pool_promise.execute(
            sql_request,
            [product.nom, product.description, product.prix, product.stock, id]
        );

        if (result['affectedRows'] === 0) {
            res.status(404).json({message: "Produit non trouvé"});
        }
        res.status(200).json({message: "Produit mis à jour !"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Update product failed !"});
    }
})

//DELETE : Supprimer un produit
productRouter.delete("/:id", async (req, res) => {
    const id = req.params['id'];

    try {
        const sql_request = "DELETE FROM products WHERE id = ?";
        const [result] = await sql_db_pool_promise.execute(sql_request, [id]);

        if (result['affectedRows'] == 0) {
            res.status(404).json({message: "Produit non trouvé"});
            return;
        }
        res.status(200).json({message: "Produit supprimé !"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Retrieve product by id failed !"});
    }
})

export const apiProductsSqlRouter = productRouter;
