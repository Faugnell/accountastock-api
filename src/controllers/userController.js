const User = require('../models/user');
const database = require('../utils/database');

// Méthode pour récupérer tous les utilisateurs
function getAllUsers(req, res) {
    database.query('SELECT * FROM user', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
}

// Méthode pour récupérer un utilisateur par son ID
function getUserById(req, res) {
    const userId = req.params.id;
    database.query('SELECT * FROM user WHERE id_user = ?', [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }
        res.json(results[0]);
    });
}

// Méthode pour créer un nouvel utilisateur
function createUser(req, res) {
    const { mail, password, name, firstname, siret, company_name, birthday } = req.body;
    const newUser = new User(null, mail, password, name, firstname, siret, company_name, birthday);
    database.query('INSERT INTO user (mail, password, name, firstname, siret, company_name, birthday) VALUES (?, ?, ?, ?, ?, ?, ?)', [newUser.mail, newUser.password, newUser.name, newUser.firstname, newUser.siret, newUser.company_name, newUser.birthday],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la création de l\'utilisateur :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            newUser.id = results.insertId;
            res.status(201).json(newUser);
        });
}


// Méthode pour mettre à jour un utilisateur
function updateUser(req, res) {
    const userId = req.params.id;
    const { name, firstname, siret, company_name, birthday } = req.body;
    const updatedUser = new User(userId, name, firstname, siret, company_name, birthday);
    database.query('UPDATE user SET name = ?, firstname = ?, siret = ?, company_name = ?, birthday = ? WHERE id_user = ?', [updatedUser.name, updatedUser.firstname, updatedUser.siret, updatedUser.company_name, updatedUser.birthday, userId],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
                return;
            }
            res.status(200).json(updatedUser);
        });
}

// Méthode pour supprimer un utilisateur
function deleteUser(req, res) {
    const userId = req.params.id;
    database.query('DELETE FROM user WHERE id_user = ?', [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }
        res.status(204).end();
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};