const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

// Route pour créer une nouvelle dépense
router.post('/create-depense', expenseController.createExpense);

// Route pour récupérer toutes les dépenses d'un utilisateur par son ID
router.get('/get-user-depenses/:userId', expenseController.getExpensesByUserId);

// Route pour récupérer une dépense par son ID
router.get('/get-expense/:id', expenseController.getExpenseById);

// Route pour mettre à jour une dépense par son ID
router.put('/update-expense/:id', expenseController.updateExpense);

// Route pour supprimer une dépense par son ID
router.delete('/delete-expense/:id', expenseController.deleteExpense);


module.exports = router;