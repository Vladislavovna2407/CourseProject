export function adminOnly(req, res, next) {
  const currentUser = req.user
  if (!currentUser || !currentUser.isAdmin) {
    return res.status(403).json({ message: "The user is not admin to perform this action" })
  }

  next();
}