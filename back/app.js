const express = require('express'); // importation du framework Express
const path = require('path');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express(); // crée une application Express

app.use(express.json());
// middleware du framework Express => permet d'extraire le corps JSON d'une requête POST venant du front-end
// en résumé : prend toutes les requêtes qui ont Content-Type : application/json et met à dispo leur body sur l'objet req
// "app.use(express.json())" est la même chose que "body-parser"


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // permet d'accéder à l'API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // permet d'ajouter les headers mentionnés aux requêtes envoyées vers l'API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);


module.exports = app; // exporte l'application pour qu'elle soit accessible depuis les autres fichiers du projet