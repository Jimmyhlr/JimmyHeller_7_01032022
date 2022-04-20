const bcrypt = require('bcrypt'); // importe le module "bcrypt" => cryptage de mdp, installé avec npm install --save bcrypt
const jwt = require('jsonwebtoken'); // importe le module "jsonwebtoken" => création de token d'authentification, installé avec npm install --save jsonwebtoken
const database = require('../middleware/database');


exports.newPost = (req, res, next) => {
  console.log(req.body);
  database.query(
    `INSERT INTO post (username, post, creation_date, last_modified)
    VALUES ('${req.userData.username}', '${req.body.post}', now(), now());`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        });
      }
      return res.status(201).send({
        message: 'Message posté !'
      })
    })
}


exports.retrieveAllPosts = (req, res, next) => {
  let user = req.userData
  database.query(
    `SELECT * FROM post
    ORDER BY creation_date DESC;`,
    (err, result) => {
     if (err) {
       throw err;
       return res.status(400).send({
         message: err
       })
     }
     return res.status(201).send({
       result,
       user
     })
    }
  )
}

exports.getComments = (req, res, next) => {
  database.query(
    `SELECT * FROM comment
    ORDER BY creation_date ASC;`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        })
      }
      console.log(result)
      return res.status(201).send({
        result
      })
    }
  )
}