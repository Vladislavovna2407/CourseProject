import sql from '../utils/db.js'
import HttpError from '../utils/httpError.js';

class TemplateService {
  static async executeSql(fn) {
    try {
      return await fn();
    } catch (error) {
      console.log(error);

      if (error?.code == 23505) {
        throw new HttpError(400, "Duplicate key value violates unique constraint.")
      }

      throw new HttpError(500, "Unknow database error.")
    }
  }

  static getAllTemplates = async () => this.executeSql(async () => {
    const response = await sql`
      SELECT 
          template.template_id AS "templateId",
          title,
          description,
          author_id AS "authorId",
          app_user.name AS "authorName",
          (SELECT count(*) FROM answer WHERE answer.template_id = template.template_id) AS "answerCount",
          ans.answer_id as "ownAnswerId"
      FROM template
      INNER JOIN public.app_user app_user ON template.author_id = app_user.app_user_id
      LEFT JOIN public.answer ans ON template.template_id = ans.template_id`

    return response
  });

  static getTemplate = async (id) => this.executeSql(async () => {
    const response = await sql`
      select template_id as "templateId", raw
      from template
      where template_id = ${id}`;

    if (response.count == 0) return null;

    return response[0];
  });

  static createTemplate = async ({ title, description, authorId, raw }) => this.executeSql(async () => {
    await sql`
    insert into template(title, description, author_id, raw)
    values (${title}, ${description}, ${authorId}, ${raw})`
  });

  static updateTemplate = async (id, { title, description, raw }) => this.executeSql(async () => {
    await sql`
    UPDATE template
    SET title = ${title},
        description = ${description},
        raw = ${raw}
    WHERE template_id = ${id}`;
  });

  static deleteTemplate = async (id) => this.executeSql(async () => {
    await sql`
    DELETE 
    FROM public.template
    WHERE template_id = ${id}`;
  });

  static createAnswer = async (templateId, responderId, raw) => this.executeSql(async () => {
    await sql`
    INSERT INTO answer (template_id, responder_id, raw)
    VALUES (${templateId}, ${responderId}, ${raw})`
  });

  static getAswer = async (templateId, answerId) => this.executeSql(async () => {
    const response = await sql`
      SELECT answer_id as "answerId", raw
      FROM answer
      WHERE template_id = ${templateId} AND answer_id = ${answerId}`;

    if (response.count == 0) return null;

    return response[0];
  });

  static getAllAnswers = async (templateId) => this.executeSql(async () => {
    const response = await sql`
      SELECT answer.answer_id as "answerId", answer.responder_id as "responderId", u.name as "responderName"
      FROM answer
      INNER JOIN public.template t on answer.template_id = t.template_id
      INNER JOIN public.app_user u on answer.responder_id = u.app_user_id
      WHERE t.template_id = ${templateId}`

    return response
  });
}

export default TemplateService;
