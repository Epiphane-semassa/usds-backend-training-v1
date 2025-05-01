import {nosql_db_connection} from "./mongoose_db";

const mongoose = nosql_db_connection;

const productSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String },
    prix: { type: Number, required: true },
    stock: { type: Number, required: true }
});

export const ProductModel = mongoose.model("products", productSchema);