import express from 'express';
import {UserModel} from "../models/auth-user";
import {generateToken} from "../security/jwt-auth";
import {authenticationFilter} from "../security/auth-filter";
import {TokenBLModel} from "../configs/tokens-blacklist.mongoose";

const authRouter = express();
const bcrypt = require("bcryptjs");

//Inscription
authRouter.post("/register", async (req, res) => {
    const user: { email, password, firstname, lastname, role } = req.body as {
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        role: string
    };

    if (!user.email || !user.password || !user.role) {
        res.status(400).json({message: "Veuillez remplir tous les champs (email, password, role) !"});
        return;
    }

    const userExists = await UserModel.findOne({email: user.email});
    if (userExists) {
        res.status(406).json({message: "Une user existe déjà avec cet email !"});
        return;
    }

    try {
        const userModel = new UserModel(user);
        await userModel.save();

        res.status(201).json({message: "Utilisateur créé avec succès !"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "User create failed !"});
    }
})

// Connexion
authRouter.post("/login", async (req, res) => {
    const loginRequest: { email, password } = req.body as { email: string, password: string };

    if (!loginRequest.email || !loginRequest.password) {
        res.status(400).json({message: "Veuillez remplir tous les champs !"});
        return;
    }

    try {
        const userModel = await UserModel.findOne({email: loginRequest.email});

        if (!userModel || !(await bcrypt.compare(loginRequest.password, userModel.password))) {
            res.status(401).json({message: "Email ou mot de passe incorrect !"});
            return;
        }

        const token = generateToken(userModel['_id'], userModel['role']);

        res.status(200).json({token});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Login user failed !"});
    }
})

// Deconnexion
authRouter.post("/logout", authenticationFilter, async (req, res) => {
    const token = req.header('Authorization')?.replace("Bearer ", "");

    const tokenBLModel = new TokenBLModel({token: token});
    await tokenBLModel.save();

    res.status(200).json({message: "Déconnexion réussie !"});
})

export const apiAuthenticationRouter = authRouter;
