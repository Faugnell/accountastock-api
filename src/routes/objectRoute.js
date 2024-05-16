const express = require('express');
const objectController = require('../controllers/objectController');

const router = express.Router();

// Route pour récupérer tous les objets d'un utilisateur par son ID
router.get('/get-user-objects/:userId', objectController.getAllObjectsByUserId);

// Route pour créer un nouvel objet
router.post('/create-object', objectController.createObject);

// Route pour récupérer un objet par son ID
router.get('/get-object/:id', objectController.getObjectById);

// Route pour mettre à jour un objet par son ID
router.put('/update-object/:id', objectController.updateObject);

// Route pour supprimer un objet par son ID
router.delete('/delete-object/:id', objectController.deleteObject);



module.exports = router;