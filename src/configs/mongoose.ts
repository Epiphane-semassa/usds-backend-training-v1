export async function connectNoSQLMongooseDB() {

    try {
        const mongoose = require('mongoose');

        mongoose.connect(
            'mongodb://localhost:27017/usds-backend-room'
        );

        const users = new mongoose.Schema({
            firstname: String,
            lastname: String,
            email: String,
        });

        //créer le modèle du documents users
        const Users = mongoose.model('users', users);

        //Créer un nouvel user
        const newUser = new Users({
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnde@gmail.com'
        });
        //newUser.save();
        //console.log('User created');

        const usersData = await Users.find();
        console.log(usersData);

    } catch (err) {
        console.error('Error connecting to MongoDB');
        console.error(err);
    }

}