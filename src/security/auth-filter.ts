import {verifyToken} from "./jwt-auth";
import {TokenBLModel} from "../configs/tokens-blacklist.mongoose";

export const authenticationFilter = async (req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({message: "Unauthorized. Accès refusé!"});
        return;
    }

    const tokenBlack = await TokenBLModel.findOne({token: token});
    if (tokenBlack) {
        res.status(401).json({message: "Unauthorized. Token revoqué"});
        return;
    }

    try {
        const decoded = verifyToken(token);
        //console.log("Decoded token: ", decoded);
        // Ajout de l'ID utilisateur décodé à la requête
        req.userId = decoded.userId;
        req.userRole = decoded.userRole;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({message: "Invalid token"});
        return;
    }
}