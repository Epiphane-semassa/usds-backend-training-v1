import express from 'express';
import {apiRouter} from "./routes";
import {apiProductsSqlRouter} from "./routes/products.routes.sql";
import {apiProductsNoSqlRouter} from "./routes/products.routes.nosql";
import {apiAuthenticationRouter} from "./routes/authentication.routes";
import {apiUsersRouter} from "./routes/users.routes";

const helmet = require("helmet");
const cors = require("cors");
const appExpress = express();
const port = 5000;

//Middleware pour parser le JSON
appExpress.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'trusted.cdn.com'", "'unsafe-eval'"],
        },
    },
    frameguard: {action: "deny"}
}));
const corsOptions = {
    origins: ['http://localhost:4300'],
    methods: ["GET, HEAD, PUT, PATCH, POST, DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // 24 hours
    optionsSuccessStatus: 200 // Pour les navigateurs anciens
}
//appExpress.use(cors(corsOptions));
appExpress.use(express.json());

appExpress.use("/api", apiRouter);
//appExpress.use("/api/products", apiProductsSqlRouter);
//appExpress.use("/api/products", apiProductsNoSqlRouter);
//appExpress.use("/api/auth", apiAuthenticationRouter);
//appExpress.use("/api/users", apiUsersRouter);


// Run server
appExpress.listen(port, () => {
    console.log(`Server app USDs listening at http://localhost:${port}`);

    //Tentative de connexion à la base de données SQL.
    //connectSQLDatabase();
    //connectSQLPoolDatabase();

    //Tentative de connexion à la base de données NoSQL.
    //connectNoSQLMongooseDB();

});