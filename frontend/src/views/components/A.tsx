import { Dialog } from "@headlessui/react"
import { NavLink } from "react-router-dom"

interface Props{
  to : string,
  children : React.ReactNode,
  className? : string,
  active : string,
  unactive : string
} 

const base = "relative w-full after:absolute after:w-[0.15rem] block after:h-full after:top-0 after:right-0 after:transition-color after:duration-150" 
  
const A = ({to, children, className, active, unactive} : Props) => {
  return (
    <NavLink to={to} className={({isActive}) => 
      [base,className, (isActive ? active : unactive)].join(" ")
    } >
      {children}
    </NavLink>
  )
}

export default A;





