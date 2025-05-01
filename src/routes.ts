import express from 'express';
import {User} from "./models/user";
import {sql_db_pool_promise} from "./configs/sql_db";

const router = express();


//Route pour la page d'accueil
router.get('/', (req, res) => {
    res.send('Hello World on our server Express with Typescript!');
});

// Route pour une API simple
router.get('/data', (req, res) => {
    res.json({message: "Ceci est une réponse Json", status: "OK RETRIEVED"});
});

//Route pour une API de create user
router.post('/users', async (req, res) => {
    try {
        const user: User = req.body as User;
        if (!user.firstname || !user.email) {
            res.status(400).json({message: "Firstname and email are required"});
            return;
        }

        const sqlRequest = "INSERT INTO `users` (firstname, lastname, email) VALUES (?, ?, ?)";
        const [result] = await sql_db_pool_promise.execute(sqlRequest, [user.firstname, user.lastname, user.email]);

        res.status(201).json({message: "User created", user: user, result: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error creating user", error: err});
    }
});

//Endpoint pour la liste des users
router.get('/users', async (req, res) => {
    try {
        const sqlRequest = "SELECT * FROM `users`";
        const users = await sql_db_pool_promise.execute(sqlRequest);
        res.status(200).json(users[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error retrieving users", error: err});
    }
});

export const apiRouter = router;
