const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost', // L'adresse du serveur MySQL
    user: 'root', // Le nom d'utilisateur MySQL
    password: '', // Le mot de passe MySQL
    database: 'accountastock' // Le nom de la base de données
});

// Fonction pour se connecter à la base de données
function connect() {
    connection.connect(err => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            throw err;
        }
        console.log('Connecté à la base de données MySQL');
    });
}

// Fonction pour exécuter une requête SQL
function query(sql, params, callback) {
    connection.query(sql, params, (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête SQL :', error);
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Export des fonctions pour les rendre accessibles depuis d'autres fichiers
module.exports = {
    connect,
    query
};