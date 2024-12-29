import UserService from '../services/userService.js';

export async function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'You are not authenticated!' })
  }

  let email = null;
  let password = null;
  try {
    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    email = auth[0];
    password = auth[1];
  }
  catch (error) {
    return res.status(400).json({ message: "Auth header is not well formed" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password must be provided' })
  }

  const user = await UserService.findUser({ email, password });
  if (!user) {
    return res.status(400).json({ message: "The user not found" })
  }

  if (!user.isActive) {
    return res.status(401).json({ message: "The user is blocked" })
  }

  req.user = user;

  next();
}

export async function optionalBasicAuth(req, res, next){
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }

  let email = null;
  let password = null;
  try {
    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    email = auth[0];
    password = auth[1];
  }
  catch (error) {
    return next();
  }

  if (!email || !password) {
    return next();
  }

  const user = await UserService.findUser({ email, password });
  if (!user) {
    return next();
  }

  if (!user.isActive) {
    return next();
  }

  req.user = user;

  next();
}