import jwt from "jsonwebtoken";
import { env } from "./env.js";
import UserModel from "./schema/users.schema.js";

async function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  // Remove 'Bearer ' prefix if present
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, env.SECRET_KEY);
    req.userId = decoded.id;

    // Fetch user details
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized!" });
  }
}

export default verifyToken;
