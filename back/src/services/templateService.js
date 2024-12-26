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
      select template_id as "templateId", title, description, author_id as "authorId", app_user.name as "authorName", raw  
      from template
      inner join public.app_user app_user on template.author_id = app_user.app_user_id`

    return response
  });

  static createTemplate = async ({ title, description, authorId, raw }) => this.executeSql(async () => {
    await sql`
    insert into template(title, description, author_id, raw)
    values (${title}, ${description}, ${authorId}, ${raw})`
  });
}

export default TemplateService;