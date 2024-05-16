const express = require('express');
const database = require('./utils/database');
const userRoute = require('./routes/userRoute');
const expenseRoute = require('./routes/expenseRoute');
const objectRoute = require('./routes/objectRoute');
const profitRoute = require('./routes/profitRoute');
const subscriptionRoute = require('./routes/subscriptionRoute');

const app = express();
const port = 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à la base de données au démarrage du serveur
database.connect();

// Monter les routes User sur le chemin '/api'
app.use('/api/users', userRoute);
app.use('/api/expenses', expenseRoute);
app.use('/api/objects', objectRoute);
app.use('/api/profits', profitRoute);
app.use('/api/subscriptions', subscriptionRoute);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});