import express from 'express'
import { param, body, matchedData, validationResult } from 'express-validator'
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

router.get(
  '/:id',
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req)

    const template = await TemplateService.getTemplate(req.params.id);
    if (!template) {
      throw new HttpError(404, "The template not found")
    }

    return res.json(template.raw);
  })
)

router.delete(
  '/:id',
  basicAuth,
  [
    param('id').notEmpty().isInt()
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req);

    const template = await TemplateService.getTemplate(req.params.id);
    if (!template) {
      throw new HttpError(404, "The template not found")
    }

    if (req.user.isAdmin || template.authorId == req.user.id) {
      await TemplateService.deleteTemplate(template.templateId)
      return res.status(204).end();
    }

    throw new HttpError(403, "The user is not authorized to perform this opeartion")
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
    data.raw = req.body
    data.authorId = req.user.id

    await TemplateService.createTemplate(data);

    res.status(204).end()
  })
)

router.patch(
  '/:id',
  basicAuth,
  [
    param('id').notEmpty().isInt(),
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('pages').notEmpty()
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req)

    const template = await TemplateService.getTemplate(req.params.id);
    if (!template) {
      throw new HttpError(404, "The template not found")
    }

    const data = matchedData(req)
    data.raw = req.body

    if (req.user.isAdmin || template.authorId == req.user.id) {
      await TemplateService.updateTemplate(template.templateId, data)
      return res.status(204).end();
    }

    throw new HttpError(403, "The user is not authorized to perform this opeartion")
  })
)

router.post(
  '/:templateId/answers',
  basicAuth,
  [
    param('templateId').notEmpty().isInt(),
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req)

    if (!req.body) {
      throw new HttpError(400, "The body is empty")
    }

    const template = await TemplateService.getTemplate(req.params.templateId);
    if (!template) {
      throw new HttpError(404, "The template not found")
    }

    await TemplateService.createAnswer(template.templateId, req.user.id, req.body)

    res.status(204).end()
  })
)

router.get(
  '/:templateId/answers/:answerId',
  basicAuth,
  [
    param('templateId').notEmpty().isInt(),
    param('answerId').notEmpty().isInt(),
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req)

    const template = await TemplateService.getTemplate(req.params.templateId);
    if (!template) {
      throw new HttpError(404, "The template not found")
    }

    if (req.user.isAdmin || template.authorId == req.user.id) {
      const answer = await TemplateService.getAswer(template.templateId, req.params.answerId);

      if (!answer) {
        throw new HttpError(404, "The answer not found")
      }

      return res.json(answer.raw);
    }

    throw new HttpError(403, "The user is not authorized to perform this opeartion")
  })
)

router.get(
  '/:templateId/answers',
  basicAuth,
  [
    param('templateId').notEmpty().isInt(),
  ],
  asyncUtil(async function (req, res) {
    ensureRequestIsValid(req)

    const template = await TemplateService.getTemplate(req.params.templateId);
    if (!template) {
      throw new HttpError(404, "The template not found")
    }

    if (req.user.isAdmin || template.authorId == req.user.id) {
      const answers = await TemplateService.getAllAnswers(req.params.templateId);
      return res.json(answers)
    }

    throw new HttpError(403, "The user is not authorized to perform this opeartion")
  })
)

export default router