const express = require('express');
const profitController = require('../controllers/profitController');

const router = express.Router();

// Route pour récupérer tous les profits d'un utilisateur par son ID
router.get('/get-user-profits/:id', profitController.getProfitsByUserId);

// Route pour récupérer un profit par son ID
router.get('/get-profit/:id', profitController.getProfitById);

// Route pour créer un nouveau profit
router.post('/create-profit', profitController.createProfit);

// Route pour mettre à jour un profit par son ID
router.put('/update-profit/:id', profitController.updateProfit);

// Route pour supprimer un profit par son ID
router.delete('/delete-profit/:id', profitController.deleteProfit);

module.exports = router;