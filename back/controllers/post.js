const fs = require('fs')
const database = require('../middleware/database')


exports.newPost = (req, res, next) => {
  database.query(
    `SELECT rights FROM user WHERE LOWER(username) = LOWER(?);`, [
      req.userData.username
    ],
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        })
      }
      let rights = result[0].rights
      if (req.file != null) {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        database.query(
          `INSERT INTO post (username, user_rights, post, creation_date, last_modified, image)
          VALUES (LOWER(?), ?, ?, now(), now(), ?);`, [
            req.userData.username,
            rights,
            req.body.post,
            imageUrl
          ],
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
      } else {
        database.query(
          `INSERT INTO post (username, user_rights, post, creation_date, last_modified)
          VALUES (LOWER(?), ?, ?, now(), now());`, [
            req.userData.username, 
            rights,
            req.body.post
          ],
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
     database.query(
       `SELECT rights FROM user WHERE LOWER(username) = LOWER(?);`, [
        user
       ],
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

exports.modifyPost = (req, res, next) => {
  database.query(
    `UPDATE post
    SET post = ?,
    last_modified = CURRENT_TIMESTAMP()
    WHERE id = ?;`, [
      req.body.modifiedPost,
      req.body.postId
    ],
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        })
      }
      return res.status(201).send({
        message: 'Message modifié'
      })
    }
  )
}

exports.deletePost = (req, res, next) => {
  database.query(
    `SELECT image FROM post WHERE id = ?;`, [
      req.body.id
    ],
    (err, result) => {
      const imageUrl = result[0].image
      database.query(
        `DELETE FROM post WHERE id = ?;`, [
          req.body.id
        ],
        (err, result) => {
          if (err) {
            throw err;
            return res.status(400).send({
              message: err
            })
          }
          if (imageUrl != null) {
            const imageName = imageUrl.split('/images/')[1]
            fs.unlink(`images/${imageName}`, (err => {
              if (err) { console.log(err) }
              else { console.log(imageName + ' supprimé') }
            }))
          }
          return res.status(201).send({
            message: 'Message supprimé'
          })
        }
      )
    }
  )

}


exports.newComment = (req, res, next) => {
  database.query(
    `SELECT rights FROM user WHERE LOWER(username) = LOWER(?);`, [
      req.userData.username
    ],
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        })
      }
      let rights = result[0].rights
      database.query(
        `INSERT INTO comment (username, user_rights, comment, post_commented, creation_date, last_modified)
        VALUES (LOWER(?), ?, ?, ?, now(), now());`, [
          req.userData.username,
          rights,
          req.body.comment,
          req.body.commentedPostId
        ],
        (err, result) => {
          if (err) {
            throw err;
            return res.status(400).send({
              message: err
            });
          }
          return res.status(201).send({
            message: 'Commentaire posté !'
          })
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
      return res.status(201).send({
        result
      })
    }
  )
}

exports.modifyComment = (req, res, next) => {
  database.query(
    `UPDATE comment
    SET comment = ?,
    last_modified = CURRENT_TIMESTAMP()
    WHERE id = ?;`, [
      req.body.modifiedComment,
      req.body.commentId
    ],
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        })
      }
      return res.status(201).send({
        message: 'Commentaire modifié'
      })
    }
  )
}

exports.deleteComment = (req, res, next) => {
  database.query(
    `DELETE FROM comment WHERE id = ?;`, [
      req.body.id
    ],
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err
        })
      }
      return res.status(201).send({
        message: 'Message supprimé'
      })
    }
  )
}
