// All actions related with users:

// [POST] /users/{id}/grant (grant admin access for user with {id})
// [POST] /users/{id}/revoke (revoke admin access for user with {id})


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

// [DELETE] /users/{id}
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

    const targetUserId = req.params.id
    const currentUser = req.user

    if (!currentUser.isAdmin) {
      throw new HttpError(403, "The user is not admin to perform this action")
    }

    const user = await getUserById(targetUserId);
    if (!user) {
      throw new HttpError(404, "The user not found")
    }

    await deleteUser(targetUserId)

    return res.status(204).end();
  })
)

// [POST] /users/{id}/block (block user with id)
// [POST] /users/{id}/unblock (unblock user with id)

export default router