import sql from '../utils/db.js'
import HttpError from '../utils/httpError.js';

async function executeSql(fn) {
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

export const createUser = async ({ email, name, password }) => executeSql(async () => {
  await sql`
    INSERT INTO app_user (email, name, password, is_active, is_admin)
    VALUES (${email}, ${name}, ${password}, true, false)`
});

export const findUser = async ({ email, password }) => executeSql(async () => {
  const response = await sql`
      SELECT app_user_id as "id", email, name, is_active as "isActive", is_admin as "isAdmin"
      FROM public.app_user
      WHERE email = ${email} AND password = ${password}`;

  if (response.count == 0) return null;

  return response[0];
});


export const getAllUsers = async () => executeSql(async () => {
  const response = await sql`
      SELECT app_user_id as "id", email, name, is_active as "isActive", is_admin as "isAdmin"
      FROM public.app_user`;

  return response;
});

export const getUserById = async (id) => executeSql(async () => {
  const response = await sql`
      SELECT app_user_id as "id", email, name, is_active as "isActive", is_admin as "isAdmin"
      FROM public.app_user
      WHERE app_user_id = ${id}`;

  if (response.count == 0) return null;

  return response[0];
});

export const deleteUser = async (id) => executeSql(async () => {
  await sql`
      DELETE public.app_user
      WHERE app_user_id = ${id}`;
});
