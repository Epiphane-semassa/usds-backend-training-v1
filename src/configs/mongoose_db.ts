require('dotenv').config();


const mongoose = require("mongoose");

/*
mongoose.connect(process.env.MONGOOSE_DB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB : "))
db.once("open", ()=> {
    console.log("Connecté à la bdd MoongoBD !");
})
*/

export const nosql_db_connection = mongoose;
