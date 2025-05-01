import {nosql_db_connection} from "./mongoose_db";

const mongoose = nosql_db_connection;

const tokenBLSchema = new mongoose.Schema({
    token: { type: String, required: true },
});

export const TokenBLModel = mongoose.model("tokens-blacklist", tokenBLSchema);