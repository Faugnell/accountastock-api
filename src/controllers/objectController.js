const Object = require('../models/object');
const database = require('../utils/database');

// Méthode pour créer un nouvel objet
function createObject(req, res) {
    const { title, note, fk_id_user, quantity } = req.body;
    const newObject = new Object(null, title, note, fk_id_user, quantity);
    database.query('INSERT INTO object (title, note, fk_id_user, quantity) VALUES (?, ?, ?, ?)', [newObject.title, newObject.note, newObject.fk_id_user, newObject.quantity],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la création de l\'objet :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            newObject.id_object = results.insertId;
            res.status(201).json(newObject);
        });
}

// Méthode pour récupérer tous les objets
function getAllObjects(req, res) {
    database.query('SELECT * FROM object', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des objets :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
}

// Méthode pour récupérer un objet par son ID
function getObjectById(req, res) {
    const objectId = req.params.id;
    database.query('SELECT * FROM object WHERE id_object = ?', [objectId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de l\'objet :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Objet non trouvé' });
            return;
        }
        res.json(results[0]);
    });
}

// Méthode pour mettre à jour un objet par son ID
function updateObject(req, res) {
    const objectId = req.params.id;
    const { title, note, fk_id_user, quantity } = req.body;
    const updatedObject = new Object(objectId, title, note, fk_id_user, quantity);
    database.query('UPDATE object SET title = ?, note = ?, fk_id_user = ?, quantity = ? WHERE id_object = ?', [updatedObject.title, updatedObject.note, updatedObject.fk_id_user, updatedObject.quantity, objectId],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la mise à jour de l\'objet :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Objet non trouvé' });
                return;
            }
            res.status(200).json(updatedObject);
        });
}

// Méthode pour supprimer un objet par son ID
function deleteObject(req, res) {
    const objectId = req.params.id;
    database.query('DELETE FROM object WHERE id_object = ?', [objectId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression de l\'objet :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Objet non trouvé' });
            return;
        }
        res.status(204).end();
    });
}

// Méthode pour ajouter une quantité à un objet par son ID
function addObjectQuantity(req, res) {
    const objectId = req.params.id;
    const { quantityToAdd } = req.body;
    database.query('SELECT quantity FROM object WHERE id_object = ?', [objectId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de la quantité de l\'objet :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Objet non trouvé' });
            return;
        }
        const currentQuantity = results[0].quantity;
        const newQuantity = currentQuantity + quantityToAdd;
        if (newQuantity < 0) {
            res.status(400).json({ error: 'La quantité ne peut pas être inférieure à zéro' });
            return;
        }
        database.query('UPDATE object SET quantity = ? WHERE id_object = ?', [newQuantity, objectId], (error, results) => {
            if (error) {
                console.error('Erreur lors de l\'ajout de la quantité de l\'objet :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            res.status(200).json({ message: 'Quantité ajoutée avec succès' });
        });
    });
}

// Méthode pour enlever une quantité à un objet par son ID
function removeObjectQuantity(req, res) {
    const objectId = req.params.id;
    const { quantityToRemove } = req.body;
    database.query('SELECT quantity FROM object WHERE id_object = ?', [objectId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de la quantité de l\'objet :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Objet non trouvé' });
            return;
        }
        const currentQuantity = results[0].quantity;
        const newQuantity = currentQuantity - quantityToRemove;
        if (newQuantity < 0) {
            res.status(400).json({ error: 'La quantité ne peut pas être inférieure à zéro' });
            return;
        }
        database.query('UPDATE object SET quantity = ? WHERE id_object = ?', [newQuantity, objectId], (error, results) => {
            if (error) {
                console.error('Erreur lors de la suppression de la quantité de l\'objet :', error);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }
            res.status(200).json({ message: 'Quantité enlevée avec succès' });
        });
    });
}

// Méthode pour récupérer tous les objets d'un utilisateur par son ID
function getAllObjectsByUserId(req, res) {
    const userId = req.params.userId;
    database.query('SELECT * FROM object WHERE fk_id_user = ?', [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des objets de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
}

module.exports = {
    createObject,
    getAllObjects,
    getObjectById,
    updateObject,
    deleteObject,
    addObjectQuantity,
    removeObjectQuantity,
    getAllObjectsByUserId
};