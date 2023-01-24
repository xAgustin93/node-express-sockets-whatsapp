import { jwt } from "../utils/index.js";

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "La peticion no tiene la cabecera de autenticación" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const hasExpired = jwt.hasExpiredToken(token);

    if (hasExpired) {
      return res.status(400).send({ msg: "El token ha expirado" });
    }

    const payload = jwt.decoded(token);
    req.user = payload;

    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token invalido" });
  }
}

export const mdAuth = {
  asureAuth,
};
