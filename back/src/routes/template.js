import express from 'express'
import { body, matchedData, validationResult } from 'express-validator'
import HttpError from '../utils/httpError.js';
import asyncUtil from '../utils/asyncUtil.js';
import TemplateService from '../services/templateService.js';
import { basicAuth } from '../utils/basicAuth.js'

function ensureRequestIsValid(req) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new HttpError(400, "The input is not valid", validationErrors.array())
  }
}

const router = express.Router();

router.get(
  '/',
  asyncUtil(async function (req, res) {
    const templates = await TemplateService.getAllTemplates();
    res.json(templates)
  })
)

router.post(
  '/',
  basicAuth,
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('pages').notEmpty()
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req)

    const data = matchedData(req)
    data.raw = req.body //JSON.stringify(req.body)
    data.authorId = req.user.id

    console.log(data)

    await TemplateService.createTemplate(data);

    res.status(204).end()
  })
)

export default router