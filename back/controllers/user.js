const bcrypt = require('bcrypt'); // importe le module "bcrypt" => cryptage de mdp, installé avec npm install --save bcrypt
const jwt = require('jsonwebtoken'); // importe le module "jsonwebtoken" => création de token d'authentification, installé avec npm install --save jsonwebtoken
const database = require('../middleware/database');


exports.signup = (req, res, next) => {
    console.log('demande de création de nouvel utilisateur');
    bcrypt.hash(req.body.password, 10) // appelle la fonction de hachage bcrypt et demande de hasher le mdp 10x (plus la valeur est élevée, plus le mdp est sécurisé mais la procédure prend du temps)
    .then(hash => {
        console.log('mot de passe haché');
        let sql = `INSERT INTO user (name, firstname, email, password)
                   VALUES ('` + req.body.name + `', '` + req.body.firstname + `', '` + req.body.email + `', '` + hash + `');`
        database.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result, 'Nouvel utilisateur enregistré');
        });          
    })
    .catch(error => res.status(503).json({ error }));
};



exports.login = (req, res, next) => {
    console.log(req.body);
    let reqEmail = req.body.email;
    let sql = `SELECT password FROM user WHERE email = '`+ reqEmail + `';`
    database.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (!result.password) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        bcrypt.compare(bcrypt.hash(req.body.password, 10), result.password)
        .then(valid => {
            if (!valid) { 
                return res.status(401).json({ error: 'Mot de passe incorrect' }); 
            }
            // à ce stade on considère que les mdp correspondent
            res.status(200).json({
                userId: user._id,                            
                token: jwt.sign(                             
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )                               
            });
        })
        .catch(error => res.status(500).json({ error }));
    });         
};