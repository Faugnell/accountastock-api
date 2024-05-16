const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

// Route pour récupérer tous les abonnements d'un utilisateur
router.get('/get-user-subscriptions/:userId', subscriptionController.getAllSubscriptionsByUser);

// Autres routes CRUD pour les abonnements peuvent être ajoutées ici

module.exports = router;