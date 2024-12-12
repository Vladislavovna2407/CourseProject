import { Fragment, useState } from 'react'
import './nav.css'

export default  function  Nav({buttonTexts}) {
    // const [activeButton, setActiveButton] = useState(null);
    // const handleActiveButton = (index) => {
    //     setActiveButton(index)
    // }




    return(
    <Fragment>
            <div>
            <ul class="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
            {buttonTexts.map((button, index) => (
                    <li key={index} class="nav-item" role="presentation">
                        <button class="btn-nav nav-link active" onClick={button.onClick} id="pills-home-tab"  data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">{button.text}</button>
                    </li>
                ))}
            </ul>
    <div class="tab-content" id="pills-tabContent">
    {/* <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div> */}
    </div>
            </div>
    </Fragment>
    )
       
}