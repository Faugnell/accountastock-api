const Profit = require('../models/profit');
const database = require('../utils/database');

// Méthode pour créer un nouveau profit
function createProfit(req, res) {
    const { title, note, amount, id_user, date } = req.body;
    const newProfit = new Profit(null, title, note, amount, id_user, date);
    database.query('INSERT INTO profit (title, note, amount, id_user, date) VALUES (?, ?, ?, ?, ?)', [newProfit.title, newProfit.note, newProfit.amount, newProfit.id_user, newProfit.date],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la création du profit :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            newProfit.id_profit = results.insertId;
            res.status(201).json(newProfit);
        });
}

// Méthode pour récupérer tous les profits
function getAllProfits(req, res) {
    database.query('SELECT * FROM profit', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des profits :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
}

// Méthode pour récupérer un profit par son ID
function getProfitById(req, res) {
    const profitId = req.params.id;
    database.query('SELECT * FROM profit WHERE id_profit = ?', [profitId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération du profit :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Profit non trouvé' });
            return;
        }
        res.json(results[0]);
    });
}

// Méthode pour mettre à jour un profit par son ID
function updateProfit(req, res) {
    const profitId = req.params.id;
    const { title, note, amount, id_user, date } = req.body;
    const updatedProfit = new Profit(profitId, title, note, amount, id_user, date);
    database.query('UPDATE profit SET title = ?, note = ?, amount = ?, id_user = ?, date = ? WHERE id_profit = ?', [updatedProfit.title, updatedProfit.note, updatedProfit.amount, updatedProfit.id_user, updatedProfit.date, profitId],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la mise à jour du profit :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Profit non trouvé' });
                return;
            }
            res.status(200).json(updatedProfit);
        });
}

// Méthode pour supprimer un profit par son ID
function deleteProfit(req, res) {
    const profitId = req.params.id;
    database.query('DELETE FROM profit WHERE id_profit = ?', [profitId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression du profit :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Profit non trouvé' });
            return;
        }
        res.status(204).end();
    });
}

// Méthode pour récupérer tous les profits d'un utilisateur par son ID
function getProfitsByUserId(req, res) {
    const userId = req.params.id;
    database.query('SELECT * FROM profit WHERE fk_id_user = ?', [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des profits de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
}

module.exports = {
    createProfit,
    getAllProfits,
    getProfitById,
    updateProfit,
    deleteProfit,
    getProfitsByUserId
};