const Expense = require('../models/expense');
const database = require('../utils/database');

// Méthode pour créer une nouvelle dépense
function createExpense(req, res) {
    const { title, note, amount, tax_percent, fk_id_user, date } = req.body;
    const newExpense = new Expense(null, title, note, amount, tax_percent, fk_id_user, date);
    database.query('INSERT INTO expense (title, note, amount, tax_percent, fk_id_user, date) VALUES (?, ?, ?, ?, ?, ?)', [newExpense.title, newExpense.note, newExpense.amount, newExpense.tax_percent, newExpense.fk_id_user, newExpense.date],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la création de la dépense :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            newExpense.id_expense = results.insertId;
            res.status(201).json(newExpense);
        });
}

// Méthode pour récupérer toutes les dépenses
function getAllExpenses(req, res) {
    database.query('SELECT * FROM expense', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des dépenses :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
}

// Méthode pour récupérer une dépense par son ID
function getExpenseById(req, res) {
    const expenseId = req.params.id;
    database.query('SELECT * FROM expense WHERE id_expense = ?', [expenseId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de la dépense :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Dépense non trouvée' });
            return;
        }
        res.json(results[0]);
    });
}

// Méthode pour mettre à jour une dépense par son ID
function updateExpense(req, res) {
    const expenseId = req.params.id;
    const { title, note, amount, tax_percent, fk_id_user, date } = req.body;
    const updatedExpense = new Expense(expenseId, title, note, amount, tax_percent, fk_id_user, date);
    database.query('UPDATE expense SET title = ?, note = ?, amount = ?, tax_percent = ?, fk_id_user = ?, date = ? WHERE id_expense = ?', [updatedExpense.title, updatedExpense.note, updatedExpense.amount, updatedExpense.tax_percent, updatedExpense.fk_id_user, updatedExpense.date, expenseId],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la mise à jour de la dépense :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Dépense non trouvée' });
                return;
            }
            res.status(200).json(updatedExpense);
        });
}

// Méthode pour supprimer une dépense par son ID
function deleteExpense(req, res) {
    const expenseId = req.params.id;
    database.query('DELETE FROM expense WHERE id_expense = ?', [expenseId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression de la dépense :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Dépense non trouvée' });
            return;
        }
        res.status(204).end();
    });
}

// Méthode pour récupérer toutes les dépenses d'un utilisateur par son ID
function getExpensesByUserId(req, res) {
    const userId = req.params.userId;
    database.query('SELECT * FROM expense WHERE fk_id_user = ?', [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des dépenses de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
}

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByUserId
};