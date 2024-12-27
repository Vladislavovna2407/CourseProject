import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'

export default function Header() {

  const navigate = useNavigate();

  const buttons = [{
    text: 'Main',
    onClick: () => navigate('/')
  },
  {
    text: 'Constructor',
    onClick: () => navigate('/constructor')
  },
  {
    text: 'Log out',
    onClick: () => navigate("/login") // TODO: clean up localStorage
  },
  ]

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
