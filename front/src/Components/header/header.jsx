import { Fragment, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../context/userContext"
import './header.css'

export default function Header() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const buttons = [
    {
      text: 'Templates',
      onClick: () => navigate('/')
    }
  ];

  if (user) {
    buttons.push(
      {
        text: '+ New form',
        onClick: () => navigate('/templates/create')
      })
    if (user.isAdmin) {
      buttons.push(
        {
          text: 'User Management',
          onClick: () => navigate('/admin')
        })
    }
    buttons.push(
      {
        text: 'Log out',
        onClick: () => {
          localStorage.removeItem('user')
          localStorage.removeItem('current-user')
          navigate('/login')
        }
      })
    console.log(user.id);

  } else {
    buttons.push(
      {
        text: 'Log in',
        onClick: () => navigate("/login") // TODO: clean up localStorage
      },
    )
  }

  return (
    <Fragment>
      <div>
        <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
          {buttons.map((button, index) => (
            <li key={index} className="nav-item" role="presentation">
              <button className="btn-nav nav-link active" onClick={button.onClick} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">{button.text}</button>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="pills-tabContent">
        </div>
      </div>
    </Fragment>
  )
}
