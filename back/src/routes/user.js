import express from 'express'
import { param, validationResult } from 'express-validator'
import HttpError from '../utils/httpError.js';
import asyncUtil from '../utils/asyncUtil.js';
import UserService from '../services/userService.js';

function ensureIdInRequest(req) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new HttpError(400, "The input is not valid", validationErrors.array())
  }
}

async function ensureUserExists(targetUserId) {
  const user = await UserService.getUserById(targetUserId);
  if (!user) {
    throw new HttpError(404, "The user not found")
  }
}

const router = express.Router();

router.get(
  '/',
  asyncUtil(async function (req, res) {
    const users = await UserService.getAllUsers();
    res.json(users)
  })
)

router.delete(
  '/:id',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await UserService.deleteUser(req.params.id)

    return res.status(204).end();
  })
)

router.post(
  '/:id/block',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await UserService.changeUserState(req.params.id, false)

    return res.status(204).end();
  })
)

router.post(
  '/:id/unblock',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await UserService.changeUserState(req.params.id, true)

    return res.status(204).end();
  })
)

router.post(
  '/:id/grant',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await UserService.changeUserRole(req.params.id, true)

    return res.status(204).end();
  })
)

router.post(
  '/:id/revoke',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureIdInRequest(req);

    await ensureUserExists(req.params.id)
    await UserService.changeUserRole(req.params.id, false)

    return res.status(204).end();
  })
)

export default router