import {UserRole} from "../models/auth-user";

export const handleAdminPermissionsFilter = async (req, res, next) => {
    if (req['userRole'] !== UserRole.ADMIN) {
        res.status(403).json({message: "Accès interdit ! Vous n'avez pas les permissions requises pour accéder à cette ressource."});
        return;
    }

    next();
}