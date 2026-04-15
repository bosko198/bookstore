function isAdmin(req, res, next) {
  // Temporary check: look for a header
  if (req.headers["x-admin"] === "true") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Admins only" });
  }
}

module.exports = isAdmin;