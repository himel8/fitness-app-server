const admin = require("firebase-admin");

async function verifyToken(req, res, next) {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeUser = await admin.auth().verifyIdToken(token);
      req.decodeUser;

      req.decodeUser = decodeUser.email;
    } catch {}
  }
  next();
}
module.exports = { verifyToken };
