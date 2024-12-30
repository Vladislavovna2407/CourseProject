import { Fragment, useState } from 'react'
import './adminPage.css'
import { useEffect } from 'react'
import Header from '../../../Components/header/header';
import { getAllUsers, deleteUserRequest, blockUserRequest, unblockUserRequest, makeAdminRequest, makeUserRequest } from '../../../Api/Api';


export default function AdminPage() {
  const authKeyName = 'user';
  const url = "http://localhost:3001";

  const [data, setData] = useState([]);

  async function deleteUser(id) {
    await deleteUserRequest(id)
    await refreshUsersTable();
  }

  async function blockUser(id) {
    await blockUserRequest(id)
    return await refreshUsersTable();
  }

  async function unblockUser(id) {
    await unblockUserRequest(id)
    return await refreshUsersTable();
  }

  async function makeAdmin(id) {
    await makeAdminRequest(id)
    return await refreshUsersTable();
  }

  async function makeUser(id) {
    await makeUserRequest(id)
    return await refreshUsersTable();
  }

  async function refreshUsersTable() {
    try {
      const users = await getAllUsers();
      setData(users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const refresh = async () => await refreshUsersTable();
    refresh().catch(console.error);
  }, []);

  function renderStatusActions(user) {
    if (user.isActive) {
      return (
        <button
          type="submit"
          className="btn btn-outline-primary mx-1"
          onClick={() => blockUser(user.id)}>
          <i className="bi bi-lock"></i>
        </button>
      );
    }

    return (
      <button
        type="submit"
        className="btn btn-outline-dark mx-1"
        onClick={() => unblockUser(user.id)}>
        <i className="bi bi-unlock"></i>
      </button>
    );
  }

  function renderRoleActions(user) {
    if (user.isAdmin) {
      return (
        <button
          type="submit"
          className="btn btn-outline-danger mx-1"
          onClick={() => makeUser(user.id)}>
          <i className="bi bi-person-x"></i>

        </button>
      );
    }

    return (
      <button
        type="submit"
        className="btn btn-outline-success mx-1"
        onClick={() => makeAdmin(user.id)}>
        <i className="bi bi-person-plus-fill"></i>
      </button>
    );
  }

  return (
    <Fragment>
      <Header />
      <div className="container position">
        <table className="table table-secondary table-hover table-striped ">
          <caption className="caption">Users List</caption>
          <thead className='thead-light' >
            <tr>
              <th scope="col">
              </th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'admin' : 'user'}</td>
                <td>{user.isActive ? 'active' : 'blocked'}</td>
                <td>
                  <div className="col-auto ml-50">
                    {renderStatusActions(user)}
                    {renderRoleActions(user)}
                    <button
                      type="submit"
                      className="btn btn-outline-danger mx-1"
                      onClick={() => deleteUser(user.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}