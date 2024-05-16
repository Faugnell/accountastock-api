const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/get-users', userController.getAllUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/get-user/:id', userController.getUserById);

// Route pour créer un nouvel utilisateur
router.post('/create-user', userController.createUser);

// Route pour mettre à jour un utilisateur par son ID
router.put('/update-user/:id', userController.updateUser);

// Route pour supprimer un utilisateur par son ID
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;