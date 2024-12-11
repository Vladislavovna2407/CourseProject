import { Fragment } from 'react'
import Nav from '../nav/nav'
import './mainPage.css'

export default function MainPage() {
  const  navForMainPage = ['Main', 'Constructor', 'Log in']
  
    return(
        <Fragment>
            <Nav buttonTexts={navForMainPage}/>
        </Fragment>
    )
}