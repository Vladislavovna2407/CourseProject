import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../nav/nav'
import './mainPage.css'

export default function MainPage() {

  let [data, setData] = useState([]);
  let url = 'http://localhost:3001';
  const authKeyName = 'user';

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

  function GetDefaultHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem(authKeyName),
    };
  }

  async function getAllTemplates() {
    const response = await fetch(url + '/templates', {
      headers: GetDefaultHeaders(),
    })
    if (response.ok) {
      return await response.json();
    }
    throw Error("Failed to getAllTempaltes().")
  }

  async function refreshTemplatesTable() {
    try {
      const templates = await getAllTemplates();
      setData(templates);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const refresh = async () => await refreshTemplatesTable();
    refresh().catch(console.error);
  }, []);

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
    text: 'Log out',
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
            {data.map((template) => (
              <tr key={template.templateId}>
                <th scope="row"></th>
                <td><a href="">{template.title}</a></td>
                <td>0</td>
                <td>{template.authorName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

