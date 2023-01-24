import bscrypt from "bcryptjs";
import { User } from "../models/index.js";
import { jwt } from "../utils/index.js";

function register(req, res) {
  const { email, password } = req.body;

  const user = new User({
    email: email.toLowerCase(),
  });

  const salt = bscrypt.genSaltSync(10);
  const hashPassword = bscrypt.hashSync(password, salt);
  user.password = hashPassword;

  user.save((error, userStorage) => {
    if (error) {
      console.log(error);
      res.status(400).send({ msg: "Error al registrar el usuario" });
    } else {
      res.status(201).send(userStorage);
    }
  });
}

function login(req, res) {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      bscrypt.compare(password, userStorage.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "Contraseña incorrecta" });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStorage),
            refresh: jwt.createRefreshToken(userStorage),
          });
        }
      });
    }
  });
}

function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).send({ msg: "Token requerido" });
  }

  const hasExpired = jwt.hasExpiredToken(refreshToken);
  if (hasExpired) {
    res.status(400).send({ msg: "Token expirado" });
  }

  const { user_id } = jwt.decoded(refreshToken);

  User.findById(user_id, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStorage),
      });
    }
  });
}

export const AuthController = {
  register,
  login,
  refreshAccessToken,
};
