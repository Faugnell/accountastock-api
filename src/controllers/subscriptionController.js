const Subscription = require('../models/subscription');
const database = require('../utils/database');

// Méthode pour récupérer tous les abonnements d'un utilisateur
function getAllSubscriptionsByUser(req, res) {
    const userId = req.params.userId;
    database.query('SELECT * FROM subscription WHERE fk_id_user = ?', [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des abonnements :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
}

// Autres méthodes CRUD pour les abonnements peuvent être ajoutées ici

module.exports = {
    getAllSubscriptionsByUser,
    // Ajoutez d'autres méthodes CRUD ici si nécessaire
};