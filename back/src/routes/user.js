import express from 'express'
import { param, validationResult } from 'express-validator'
import HttpError from '../utils/httpError.js';
import asyncUtil from '../utils/asyncUtil.js';
import { getAllUsers, getUserById, deleteUser, changeUserState, changeUserRole } from '../services/userService.js'

function ensureIdInRequest(req) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new HttpError(400, "The input is not valid", validationErrors.array())
  }
}

async function ensureUserExists(targetUserId) {
  const user = await getUserById(targetUserId);
  if (!user) {
    throw new HttpError(404, "The user not found")
  }
}

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
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await deleteUser(req.params.id)

    return res.status(204).end();
  })
)

// [POST] /users/{id}/block (block user with id)
router.post(
  '/:id/block',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await changeUserState(req.params.id, false)

    return res.status(204).end();
  })
)

// [POST] /users/{id}/unblock (unblock user with id)
router.post(
  '/:id/unblock',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await changeUserState(req.params.id, true)

    return res.status(204).end();
  })
)

// [POST] /users/{id}/grant (grant admin access for user with {id})
router.post(
  '/:id/grant',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await changeUserRole(req.params.id, true)

    return res.status(204).end();
  })
)

// [POST] /users/{id}/revoke (revoke admin access for user with {id})
router.post(
  '/:id/revoke',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await changeUserRole(req.params.id, false)

    return res.status(204).end();
  })
)

export default router