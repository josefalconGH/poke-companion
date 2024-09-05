// Purpose: server authentication utilities
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

const secret = "secret_travel_buddy"; // secret key
const expiration = "2h"; // 2 hours

export const AuthenticationError = new GraphQLError(
  "Unable to authenticate user...",
  {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }
);

// auth middleware function
export const authMiddleware = function (req, res, next) {
  // token sending in req query or headers
  let token = req.query.token || req.headers.authorization;

  // if token in headers, adjust token value
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  // if no token, return message
  if (!token) {
    return res.status(400).json({ message: "You have no token!" });
  }

  // verify token
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
    return res.status(400).json({ message: "invalid token!" });
  }

  // next middleware
  next();
};

// sign token function
export const signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };

  // return jwt token with payload, secret, and expiration
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
