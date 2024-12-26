import { Fragment, useState } from 'react'
import './nav.css'

export default function Nav({ buttonTexts }) {

    return (
        <Fragment>
            <div>
                <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
                    {buttonTexts.map((button, index) => (
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