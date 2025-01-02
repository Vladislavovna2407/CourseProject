import express from 'express'
import { body, validationResult, matchedData } from 'express-validator'
import HttpError from '../utils/httpError.js';
import asyncUtil from '../utils/asyncUtil.js';
import UserService from '../services/userService.js';

function ensureRequestIsValid(req) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new HttpError(400, "The input is not valid", validationErrors.array())
  }
}

const router = express.Router();

router.post(
  '/register',
  [
    body('email').notEmpty().isEmail(),
    body('name').notEmpty(),
    body('password').notEmpty()
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req);
    const user = await UserService.createUser(matchedData(req))
    return res.status(200).json(user);
  })
)

router.post(
  '/login',
  [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req);

    const user = await UserService.findUser(matchedData(req));
    if (!user) {
      throw new HttpError(400, "The user not found")
    }

    if (!user.isActive) {
      throw new HttpError(400, "The user is blocked")
    }

    return res.status(200).json(user);
  }));


export default router