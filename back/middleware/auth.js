const jwt = require("jsonwebtoken");

exports.validateRegister = (req, res, next) => {
    // username min length 3
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        message: "Veuillez saisir un nom d'utilisateur avec au moins 3 charactères"
      });
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        message: "Veuillez saisir un mot de passe avec au moins 6 charactères"
      });
    }
    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        message: "Les deux mots de passe doivent correspondre"
      });
    }
    next();
  };

exports.isLoggedIn = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        'SECRETKEY'
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        message: "La session n'est pas valide"
      });
    }
  };
