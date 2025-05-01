import express from 'express';
import {UserModel} from "../models/auth-user";
import {generateToken} from "../security/jwt-auth";
import {authenticationFilter} from "../security/auth-filter";
import {Product} from "../models/products";
import {ProductModel} from "../configs/products.mongoose";

const userRouter = express();
const bcrypt = require("bcryptjs");

//Get user connected
userRouter.get("/user-authenticated", authenticationFilter, async (req, res) => {
    try {
        const userModel = await UserModel.findOne({_id: req['userId']});
        if (!userModel) {
            res.status(401).json({message: "Utilisateur non trouvé !"});
            return;
        }

        res.status(201)
            .json({
                    message: "Utilisateur trouvé avec succès !",
                    data: {
                        email: userModel.email,
                        firstname: userModel.firstname,
                        lastname: userModel.lastname,
                    }
                }
            );
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Fetch User logged failed !"});
    }
})

// update user logged infos
userRouter.put("/update-info", authenticationFilter, async (req, res) => {
    const id = req['userId'];
    const userInfo = req.body as { email: string, firstname: string, lastname: string };

    if (!userInfo.email) {
        res.status(400).json({message: "L'email du user est requis."});
        return;
    }

    try {
        const userModel = await UserModel.findByIdAndUpdate(
            id,
            userInfo,
            {new: true}
        );

        if (!userInfo) {
            res.status(404).json({message: "User non trouvé"});
        }

        res.status(200)
            .json({
                    message: "User mis à jour !",
                    data: {email: userModel.email, firstname: userModel.firstname, lastname: userModel.lastname}
                }
            );
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Update user failed !"});
    }
})


export const apiUsersRouter = userRouter;
