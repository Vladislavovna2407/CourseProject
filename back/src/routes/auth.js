// [POST] /login
// [POST] /users

import express from 'express'
import { body, validationResult, matchedData } from 'express-validator'
import HttpError from '../utils/httpError.js';
import asyncUtil from '../utils/asyncUtil.js';
import { createUser, findUser } from '../services/userService.js'

// from express library documentation:
const router = express.Router();

// Create new user
router.post(
  '/register', // URL
  [
    body('email').notEmpty().isEmail(),
    body('name').notEmpty(),
    body('password').notEmpty()
  ], // input validation
  asyncUtil(async function (req, res) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new HttpError(400, "The input is not valid", validationErrors.array())
    }

    // save to database
    await createUser(matchedData(req)) 

    // return to client
    return res.status(201).end();
  })
)

router.post(
  '/login',
  [
      body('email').notEmpty().isEmail(),
      body('password').notEmpty()
  ],
  asyncUtil(async function (req, res) {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw new HttpError(400, "The input is not valid", validationErrors.array())
      }

      const user = await findUser(matchedData(req));
      if (!user) {
          throw new HttpError(400, "The user not found")
      }

      if (!user.isActive) {
          throw new HttpError(400, "The user is blocked")
      }

      return res.status(200).json(user);
  }));


export default router