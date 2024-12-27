import { Fragment, useState } from 'react'
import './adminPage.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from '../../../Components/nav/nav';


export default function AdminPage() {
  const authKeyName = 'user';
  const url = "http://localhost:3001";

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  function GetDefaultHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem(authKeyName),
    };
  }

  async function getAllUsers() {
    const response = await fetch(url + '/users/', {
      headers: GetDefaultHeaders(),
    })
    if (response.ok) {
      return await response.json();
    }
    throw Error("Failed to getAllUsers().");
  }


  async function deleteUser(id) {
    const response = await fetch(url + `/users/${id}`, {
      headers: GetDefaultHeaders(),
      method: 'DELETE',
    })
    await refreshUsersTable();
  }


  async function blockUser(id) {
    const response = await fetch(url + `/users/${id}/block`, {
      headers: GetDefaultHeaders(),
      method: 'POST',
    })
    return await refreshUsersTable();

  }


  async function unblockUser(id) {
    const response = await fetch(url + `/users/${id}/unblock`, {
      headers: GetDefaultHeaders(),
      method: 'POST'
    })
    return await refreshUsersTable();
  }

  async function makeAdmin(id) {
    const response = await fetch(url + `/users/${id}/grant`, {
      headers: GetDefaultHeaders(),
      method: 'POST'
    })
    return await refreshUsersTable();
  }

  async function makeUser(id) {
    const response = await fetch(url + `/users/${id}/revoke`, {
      headers: GetDefaultHeaders(),
      method: 'POST'
    })
    return await refreshUsersTable();
  }

  // const  navForAdminPage = ['Main', 'Constructor', 'Log out'];
  //   const mokList = [{
  //       name: 'Ira',
  //       email: 'ira@mail.com',
  //       id: '1',
  //       lastSeen: '11-12-2024',
  //       status:' active'
  //   },
  //   {
  //     name: 'Ira',
  //     email: 'ira@mail.com',
  //     id: '2',
  //     lastSeen: '11-12-2024',
  //     status:' active'
  // },
  // {
  //     name: 'Ira',
  //     email: 'ira@mail.com',
  //     id: '3',
  //     lastSeen: '11-12-2024',
  //     status:' active'
  // },
  // {
  //     name: 'Ira',
  //     email: 'ira@mail.com',
  //     id: '4',
  //     lastSeen: '11-12-2024',
  //     status:' active'
  // },
  // {
  //     name: 'Ira',
  //     email: 'ira@mail.com',
  //     id: '5',
  //     lastSeen: '11-12-2024',
  //     status:' active'
  // },
  // {
  //     name: 'Ira',
  //     email: 'ira@mail.com',
  //     id: '6',
  //     lastSeen: '11-12-2024',
  //     status:' active'
  // }]


  const navForAdminPage = [{
    text: 'Main',
    onClick: handleButtonMain
  },
  {
    text: 'Constructor',
    onClick: handleButtonConstructor
  },
  {
    text: 'Log out',
    onClick: goAuthorization
  },
  ]

  function handleButtonConstructor() {
    navigate("/constructor")
  }

  function handleButtonMain() {
    navigate('/')
  }

  function goAuthorization() {
    navigate('/login')
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
      <Nav buttonTexts={navForAdminPage} />
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
                    {/* <button
                      type="submit"
                      className="btn btn-outline-success mx-1"
                      onClick={() => makeUser(user.id)}
                    >
                      <i class="bi bi-person-plus-fill"></i>
                    </button> */}

                    <button
                      type="submit"
                      className="btn btn-outline-danger mx-1"
                      onClick={() => deleteUser(user.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
                {/* <td>{new Date(user.lastSeen).toLocaleString()}</td> */}
                {/* <td>{user.state ? "active" : "blocked"}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}