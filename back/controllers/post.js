const bcrypt = require('bcrypt'); // importe le module "bcrypt" => cryptage de mdp, installé avec npm install --save bcrypt
const jwt = require('jsonwebtoken'); // importe le module "jsonwebtoken" => création de token d'authentification, installé avec npm install --save jsonwebtoken
const database = require('../middleware/database');


exports.newPost = (req, res, next) => {
  database.query(
    `SELECT rights FROM user WHERE LOWER(username) = '${req.userData.username}';`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        })
      }
      let rights = result[0].rights
      console.log(rights)
      database.query(
        `INSERT INTO post (username, user_rights, post, creation_date, last_modified)
        VALUES ('${req.userData.username}', '${rights}', '${req.body.post}', now(), now());`,
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
  )

}


exports.retrieveAllPosts = (req, res, next) => {
  let user = req.userData.username
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
     let feed = result
     console.log(feed)
     database.query(
       `SELECT rights FROM user WHERE LOWER(username) = '${user}';`,
       (err, result) => {
         if (err) {
           throw err
           return res.status(400).sendd({
             message: err
           })
         }
         let rights = result[0]
         return res.status(201).send({
           feed,
           user,
           rights
         })
         console.log(res)

       }
     )
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