import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants.js";

function createAccessToken(user) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 24);

  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jsonwebtoken.sign(payload, JWT_SECRET_KEY);
}

function createRefreshToken(user) {
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1);

  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jsonwebtoken.sign(payload, JWT_SECRET_KEY);
}

function decoded(token) {
  return jsonwebtoken.decode(token, JWT_SECRET_KEY, true);
}

function hasExpiredToken(token) {
  const { exp } = decoded(token);
  const currentDate = new Date().getTime();

  if (exp <= currentDate) {
    return true;
  }

  return false;
}

export const jwt = {
  createAccessToken,
  createRefreshToken,
  decoded,
  hasExpiredToken,
};
