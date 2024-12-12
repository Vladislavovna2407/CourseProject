import { Fragment } from 'react'
import './adminPage.css'
import Nav from '../nav/nav'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const navigate = useNavigate();

    // const  navForAdminPage = ['Main', 'Constructor', 'Log out'];
    const mokList = [{
        name: 'Ira',
        email: 'ira@mail.com',
        id: '1',
        lastSeen: '11-12-2024',
        status:' active'
    },
    {
      name: 'Ira',
      email: 'ira@mail.com',
      id: '2',
      lastSeen: '11-12-2024',
      status:' active'
  },
  {
      name: 'Ira',
      email: 'ira@mail.com',
      id: '3',
      lastSeen: '11-12-2024',
      status:' active'
  },
  {
      name: 'Ira',
      email: 'ira@mail.com',
      id: '4',
      lastSeen: '11-12-2024',
      status:' active'
  },
  {
      name: 'Ira',
      email: 'ira@mail.com',
      id: '5',
      lastSeen: '11-12-2024',
      status:' active'
  },
  {
      name: 'Ira',
      email: 'ira@mail.com',
      id: '6',
      lastSeen: '11-12-2024',
      status:' active'
  }]
  

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
  navigate("/")
}

function handleButtonMain(){
  navigate ('/')
}

function goAuthorization(){
  navigate('/login')
}


    return(
        <Fragment>
            <Nav buttonTexts={navForAdminPage}/>
            <div className="container position">
        <table className="table table-secondary table-hover table-striped ">
          <caption className="caption">Users List</caption>
          <thead className='thead-light' >
            <tr>
              <th scope="col">
              </th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Last seen</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {mokList.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastSeen}</td>
                <td>{user.status}</td>
                <td>
                  <div className="col-auto ml-50">
          <button
            type="submit"
            className="btn btn-outline-primary mx-1"
          >
            <i className="bi bi-lock"></i>
          </button>
          <button
            type="submit"
            className="btn btn-outline-primary mx-1"
          >
            <i className="bi bi-unlock"></i>
          </button>
          <button
            type="submit"
            className="btn btn-outline-danger mx-1"
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