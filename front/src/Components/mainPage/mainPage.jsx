import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../nav/nav'
import './mainPage.css'

export default function MainPage() {
    const navigate = useNavigate();

function goLogin() {
    navigate("/login")
}

function handleButtonMain(){
    navigate ('/')
}

function handleButtonConstructor(){
    navigate('/')
}
// const buttons = [
//     { text: 'Кнопка 1', onClick: handleButtonClick1 },
//     { text: 'Кнопка 2', onClick: handleButtonClick2 },]

// const navForMainPage = ['Main', 'Constructor', 'Log in']
 

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
  
    return(
        <Fragment>
            <Nav buttonTexts={navForMainPage}/>
        </Fragment>
    )
}