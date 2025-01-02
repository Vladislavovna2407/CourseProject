import sql from '../utils/db.js'
import HttpError from '../utils/httpError.js';

class UserService {
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

  static createUser = async ({ email, name, password }) => this.executeSql(async () => {
    const response = await sql`
    INSERT INTO app_user (email, name, password, is_active, is_admin)
    VALUES (${email}, ${name}, ${password}, true, true)
    RETURNING app_user_id as "id", email, name, is_active as "isActive", is_admin as "isAdmin"`

    return response[0]
  });

  static findUser = async ({ email, password }) => this.executeSql(async () => {
    const response = await sql`
    SELECT app_user_id as "id", email, name, is_active as "isActive", is_admin as "isAdmin"
    FROM public.app_user
    WHERE email = ${email} AND password = ${password}`;

    if (response.count == 0) return null;

    return response[0]
  });

  static getAllUsers = async () => this.executeSql(async () => {
    const response = await sql`
    SELECT app_user_id as "id", email, name, is_active as "isActive", is_admin as "isAdmin"
    FROM public.app_user
    ORDER BY app_user_id`;

    return response;
  });

  static getUserById = async (id) => this.executeSql(async () => {
    const response = await sql`
    SELECT app_user_id as "id", email, name, is_active as "isActive", is_admin as "isAdmin"
    FROM public.app_user
    WHERE app_user_id = ${id}`;

    if (response.count == 0) return null;

    return response[0];
  });

  static deleteUser = async (id) => this.executeSql(async () => {
    await sql`
    DELETE 
    FROM public.app_user
    WHERE app_user_id = ${id}`;
  });

  static changeUserState = async (id, isActive) => this.executeSql(async () => {
    await sql`
    UPDATE public.app_user
    SET is_active = ${isActive}
    WHERE app_user_id = ${id}`
  });

  static changeUserRole = async (id, isAdmin) => this.executeSql(async () => {
    await sql`
    UPDATE public.app_user
    SET is_admin = ${isAdmin}
    WHERE app_user_id = ${id}`
  });
}

export default UserService;