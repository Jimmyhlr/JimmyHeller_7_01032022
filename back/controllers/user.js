const bcrypt = require('bcrypt'); // importe le module "bcrypt" => cryptage de mdp, installé avec npm install --save bcrypt
const jwt = require('jsonwebtoken'); // importe le module "jsonwebtoken" => création de token d'authentification, installé avec npm install --save jsonwebtoken
const database = require('../middleware/database');


exports.signup = (req, res, next) => {
    database.query(
      `SELECT * FROM user WHERE LOWER(username) = LOWER(?);`, [
        req.body.username
      ],
      (err, result) => {
        if (result.length > 0) {
          return res.status(409).send({
            message: "Ce nom d'utilisateur est déjà pris"
          });
        } else {
        // le nom d'utilisateur est disponible
          //le nom d'utilisateur fait moins de 3 caractères
          if (!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
              message: "Veuillez saisir un nom d'utilisateur avec au moins 3 charactères"
            });
          }
          // le mot de passe fait moins de 6 caractères
          if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
              message: "Veuillez saisir un mot de passe avec au moins 6 charactères"
            });
          }
          // les deux mots de passes saisis ne correspondent pas
          if (
            !req.body.password_repeat ||
            req.body.password != req.body.password_repeat
          ) {
            return res.status(400).send({
              message: "Les deux mots de passe doivent correspondre"
            });
          }
          if (req.body.username.length >= 3 && req.body.password == req.body.password_repeat) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).send({
                  message: err
                });
              } else {
                // hache le mdp et ajoute à la bdd
                database.query(
                  `INSERT INTO user (username, password, registered)
                  VALUES (?, ?, now());`, [
                    req.body.username,
                    hash
                  ],
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
      }
    );
};


exports.login = (req, res, next) => {
  database.query(
    "SELECT * FROM user WHERE username = ?;", [
      req.body.username
    ],
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
              "UPDATE user SET last_login = now() WHERE LOWER(username) = LOWER(?);", [
                result[0].username
              ]
            );
            console.log()
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
  database.query(
    `SELECT username, registered, rights FROM user WHERE ( username = ? );`, [
      req.userData.username //req.userData vient du middleware de vérification de token
    ],
    (err, result) => {
      if (err) throw err
      return res.status(200).json(result)
    }
  )
};


exports.deleteAccount = (req, res, next) => {  
  database.query(
    `DELETE FROM user WHERE ( username = ? );`, [
      req.userData.username
    ],
    (err, result) => {
      if (err) throw err
      return res.status(200).send({
        message: 'Compte supprimé'
      })
    }
  )
};