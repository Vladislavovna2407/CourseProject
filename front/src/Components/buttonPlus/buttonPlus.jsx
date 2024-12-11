import { Fragment, useState } from "react"
import './buttonPlus.css'




export default function ButtonPlus({hoverText}) {

    const[isHovered, setIsHovered] = useState(false);

return(
  <Fragment>
      <div className="location"   onMouseEnter={()=> setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
      <i className="bi bi-plus-circle-fill icons" data-toggle="tooltip" data-placement="top" title={hoverText}></i>
      {/* {isHovered && <span className="span">{hoverText}</span>} */}
      {/* {isHovered && <span className="span">{hoverText}</span>} */}
      </div>
  </Fragment>
)
}