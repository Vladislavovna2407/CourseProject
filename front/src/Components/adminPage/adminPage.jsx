import { Fragment } from 'react'
import './adminPage.css'
import Nav from '../nav/nav'

export default function AdminPage() {

    const  navForAdminPage = ['Main', 'Constructor', 'Log out'];
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
            </tr>
          </thead>
          <tbody>
            {mokList.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                  {/* <label>
                    {/* <input
                      id={user.id}
                      type="checkbox"
                      className="select-checkbox select-checkbox-row"
                    />
                  </label> */} 
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastSeen}</td>
                <td>{user.status}</td>
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