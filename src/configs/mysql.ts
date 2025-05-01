import mysql from 'mysql2';

export function connectSQLDatabase() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'usds-backend-room'
    });

    connection.connect(err => {
        if (err) {
            console.error('Error Database connecting failed: ' + err.stack);
            return;
        }
        console.log('Database connected as successfully!! ');
    });

    // Exécuter une requête SQL
    const sqlRequest = "SELECT * FROM `users`";
    connection.query(sqlRequest, (err, result, fields) => {
        if (err) throw err;
        console.log("Resultats de la requete: ", result);
    });

// Fermer la connexion (optionnelle)
    connection.end()
}