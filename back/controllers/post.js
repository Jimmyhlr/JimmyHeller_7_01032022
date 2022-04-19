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
  database.query(
    `SELECT * FROM post;`,
    (err, result) => {
     if (err) {
       throw err;
       return res.status(400).send({
         message: err
       })
     }
     return res.status(201).send({
       result
     })
    }
  )
}

exports.retrieveComments = (req, res, next) => {
  database.query(
    `SELECT FROM comment WHERE post_commented ='${req.body.messageId}';`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        })
      }
      else if (!result) {
        return res.status(201)
      }
      return res.status(201).send({
        result
      })
    }
  )
}