import sql from '../utils/db.js'
import HttpError from '../utils/httpError.js';

export async function createUser({ email, name, password }) {
  try {
    await sql`
      INSERT INTO app_user (email, name, password, is_active, is_admin)
      VALUES (${email}, ${name}, ${password}, true, false)`
  } catch (error) {
    if (error.constraint_name === 'email_lower_idx') {
      throw new HttpError(400, "The user with the same name is already exist.");
    }
    throw new HttpError(500, "Unknow database error.")
  }
}

export async function findUser({ email, password }) {
  try {
    const response = await sql`
      SELECT app_user_id, email, name, is_active, is_admin
      FROM public.app_user
      WHERE email = ${email} AND password = ${password}`;

    if (response.count == 0) return null;

    return {
      id: response[0].app_user_id,
      email: response[0].email,
      isActive: response[0].is_active,
      isAdmin: response[0].is_admin,
    };
  } catch (error) {
    throw new HttpError(500, "Unknow database error.")
  }
}

export async function getAllUsers() {
  try {
    const response = await sql`
      SELECT app_user_id, email, name, is_active, is_admin
      FROM public.app_user`;

    return response.map(function (user) {
      return {
        id: user.app_user_id,
        email: user.email,
        isActive: user.is_active,
        isAdmin: user.is_admin
      }
    })
  } catch (error) {
    console.log(error);
    throw new HttpError(500, "Unknow database error.")
  }
}

export async function getUserById(id) {
  try {
    const response = await sql`
      SELECT app_user_id, email, name, is_active, is_admin
      FROM public.app_user
      WHERE app_user_id = ${id}`;

    if (response.count == 0) return null;

    return {
      id: response[0].app_user_id,
      email: response[0].email,
      isActive: response[0].is_active,
      isAdmin: response[0].is_admin,
    };
  } catch (error) {
    throw new HttpError(500, "Unknow database error.")
  }
}

export async function deleteUser(id){
  try {
    await sql`
      DELETE public.app_user
      WHERE app_user_id = ${id}`;
  } catch (error) {
    throw new HttpError(500, "Unknow database error.")
  }
}
