const bcrypt = require('bcrypt'); // importe le module "bcrypt" => cryptage de mdp, installé avec npm install --save bcrypt
const jwt = require('jsonwebtoken'); // importe le module "jsonwebtoken" => création de token d'authentification, installé avec npm install --save jsonwebtoken
const database = require('../middleware/database');

/*

exports.signup = (req, res, next) => {
    console.log('demande de création de nouvel utilisateur');
    bcrypt.hash(req.body.password, 10) // appelle la fonction de hachage bcrypt et demande de hasher le mdp 10x (plus la valeur est élevée, plus le mdp est sécurisé mais la procédure prend du temps)
    .then(hash => {
        console.log('mot de passe haché');
        let sql = `INSERT INTO user (username, password, registered)
                   VALUES ('` + req.body.username + `', '` + hash + `', CURRENT_TIMESTAMP);`
        database.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result, 'Nouvel utilisateur enregistré');
        });          
    })
    .catch(error => res.status(503).json({ error }));
};



exports.login = (req, res, next) => {
    console.log(req.body);
    let sql = `SELECT password FROM user WHERE username = '`+ req.body.username + `';`
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

*/

exports.userinfos = (req, res, next) => {
  let sql = `SELECT username FROM user WHERE id = 9;`
  database.query(sql, function (err, result, fields) {
      if (err) throw err;
      return res.status(200).json(result);
  });  
};

//////////////////////////////////////////////////////////////////

exports.signup = (req, res, next) => {
    database.query(
      `SELECT * FROM user WHERE LOWER(username) = LOWER(${database.escape(req.body.username)});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            message: "Ce nom d'utilisateur est déjà pris"
          });
        } else {
          // le nom d'utilisateur est disponible
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                message: err
              });
            } else {
              // hache le mdp et ajoute à la bdd
              database.query(
                `INSERT INTO user (username, password, registered)
                VALUES (${database.escape(req.body.username)}, ${database.escape(hash)}, now());`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      message: err
                    });
                  }
                  return res.status(201).send({
                    message: 'Registered!'
                  });
                }
              );
            }
          });
        }
      }
    );
};



exports.login = (req, res, next) => {
  database.query(
    `SELECT * FROM user WHERE username = ${database.escape(req.body.username)};`,
    (err, result) => {
      // l'utilisateur n'existe pas
      if (err) {
        console.log(err);
        throw err;
        return res.status(400).send({
          message: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          message: "Nom d'utilisateur ou mot de passe est incorrect"
        });
      }
      // vérification du mdp
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // mauvais mdp
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              message: "Nom d'utilisateur ou mot de passe incorrect"
            });
          }
          if (bResult) {
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
            database.query(
              `UPDATE user SET last_login = now() WHERE id = '${result[0].id}';`
            );
            return res.status(200).send({
              message: 'Connecté !',
              token,
              user: result[0]
            }),
            console.log(token);
          }
          return res.status(401).send({
            message: "Nom d'utilisateur ou mot de passe incorrect"
          });
        }
      );
    }
  );
};

