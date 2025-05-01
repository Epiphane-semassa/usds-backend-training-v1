
const jwtAuth = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userId, userRole) => {
    return jwtAuth.sign(
        {
            userId,
            userRole
        },
        jwtSecret,
        {
            expiresIn: "1h",
        }
    );
}

export const verifyToken = (token) => {
    return jwtAuth.verify(token, jwtSecret);
}


/*
return new Promise((resolve, reject) => {
    jwtAuth.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return reject(err);
        }
        resolve(decoded);
    });
});*/
