import mysql from 'mysql2';

export function connectSQLPoolDatabase() {

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'usds-backend-room',
        waitForConnections: true,
        connectTimeout: 60000,
        connectionLimit: 10,
        queueLimit: 0
    });

    // Exécuter une requête SQL
    const sqlRequest = "SELECT * FROM `users`";
    pool.query(sqlRequest, (err, result, fields) => {
        if (err) throw err;
        console.log("Resultats de la requete: ", result);
    });

    // Executer une requête préparee
    const sqlSecuredRequest = "SELECT * FROM `users` where firstname LIKE '%God%'";
    pool.execute(sqlSecuredRequest, (err, result, fields) => {
        if (err) throw err;
        console.log("Resultats de la requete sécurisée: ", result);
    });


}