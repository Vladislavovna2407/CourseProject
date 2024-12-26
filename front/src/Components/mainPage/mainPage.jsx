import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../nav/nav'
import './mainPage.css'

export default function MainPage() {
  const navigate = useNavigate();

  function goLogin() {
    navigate("/login")
  }

  function handleButtonMain() {
    navigate('/')
  }

  function handleButtonConstructor() {
    navigate('/constructor')
  }
  // const buttons = [
  //     { text: 'Кнопка 1', onClick: handleButtonClick1 },
  //     { text: 'Кнопка 2', onClick: handleButtonClick2 },]

  // const navForMainPage = ['Main', 'Constructor', 'Log in']

  const mokData = [{
    name: 'Standart form',
    replies: '3',
    id: '1',
    author: 'Ira'
  },
  {
    name: 'Invitation form',
    replies: '10',
    id: '2',
    author: 'Sergey'
  },
  {
    name: 'Form with private information',
    replies: '100',
    id: '3',
    author: 'Jess'
  },
  {
    name: 'Contact information',
    replies: '37',
    id: '4',
    author: 'Julia'
  },
  {
    name: 'Form with delivery infromation',
    replies: '15',
    id: '5',
    author: 'Vera'
  },
  ]

  const navForMainPage = [{
    text: 'Main',
    onClick: handleButtonMain
  },
  {
    text: 'Constructor',
    onClick: handleButtonConstructor
  },
  {
    text: 'Log in',
    onClick: goLogin
  },
  ]

  return (
    <Fragment>
      <Nav buttonTexts={navForMainPage} />
      <div className="container position">
        <table className="table table-secondary table-hover table-striped ">
          <caption className="caption">List of templates</caption>
          <thead className='thead-light' >
            <tr>
              <th scope="col">
              </th>
              <th scope="col">Name of template</th>
              <th scope="col">Replies</th>
              <th scope="col">The author</th>
            </tr>
          </thead>
          <tbody>
            {mokData.map((user) => (
              <tr key={user.id}>
                <th scope="row"></th>
                <td>{user.name}</td>
                <td>{user.replies}</td>
                <td>{user.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

