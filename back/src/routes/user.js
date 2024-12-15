// All actions related with users:
// [POST] /users/{id}/block (block user with id)
// [POST] /users/{id}/unblock (unblock user with id)
// [POST] /users/{id}/grant (grant admin access for user with {id})
// [POST] /users/{id}/revoke (revoke admin access for user with {id})
// [DELETE] /users/{id}

import express from 'express'
import { param, validationResult } from 'express-validator'
import HttpError from '../utils/httpError.js';
import asyncUtil from '../utils/asyncUtil.js';
import { getAllUsers, getUserById, deleteUser } from '../services/userService.js'

// from express library documentation:
const router = express.Router();

// [GET] /users/ (table with users)
router.get(
  '/',
  asyncUtil(async function (req, res) {
    const users = await getAllUsers();
    res.json(users)
  })
)

router.delete(
  '/:id',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new HttpError(400, "The input is not valid", validationErrors.array())
    }

    const userId = req.params.id;
    console.log(userId);

    // TODO: Must be current user.
    const user = await getUserById(userId);
    if (!user) {
      throw new HttpError(404, "The user not found")
    }

    if (!user.isAdmin) {
      throw new HttpError(403, "The user is not admin to perform this action")
    }

    await deleteUser()

    return res.status(204)
  })
)

export default router