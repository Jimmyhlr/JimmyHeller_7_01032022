const bcrypt = require('bcrypt'); // importe le module "bcrypt" => cryptage de mdp, installé avec npm install --save bcrypt
const jwt = require('jsonwebtoken'); // importe le module "jsonwebtoken" => création de token d'authentification, installé avec npm install --save jsonwebtoken
const database = require('../middleware/database');


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
                  const token = jwt.sign({
                    username: req.body.username
                  },
                  'SECRETKEY', {
                    expiresIn: '7d'
                  }
                  );
                  return res.status(201).send({
                    message: 'Compte créé !',
                    token
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
                username: result[0].username
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
            database.query(
              `UPDATE user SET last_login = now() WHERE LOWER(username) = 'LOWER(${result[0].username})';`
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


exports.userinfos = (req, res, next) => {
  let sql = `SELECT username, registered, rights FROM user WHERE ( username = '${req.userData.username}' );` //req.userData vient du middleware de vérification de token
  database.query(sql, function (err, result, fields) {
      if (err) throw err;
      return res.status(200).json(result);
  });  
};


exports.deleteAccount = (req, res, next) => {
  console.log(req.body);
  let sql = `DELETE FROM user WHERE ( username = '${req.userData.username}' );` //req.userData vient du middleware de vérification de token
  console.log(sql);
  database.query(sql, function (err, result, fields) {
      if (err) throw err;
      return res.status(200).send({
        message: 'Compte supprimé'
      });
  });  
};