import {nosql_db_connection} from "../configs/mongoose_db";

const mongoose = nosql_db_connection;
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    role: {type: String},
});

userSchema.pre("save", async function (next) {
    // Hash the password before saving the user model
    if (this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})
export const UserModel = mongoose.model("auth-users", userSchema);

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}