import {FiMenu} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import logo from "./../../assets/logo.png";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../fitures/sidebarSlice";

function Navbar() {

  const dispatch = useDispatch();


  return (
    <div className='flex md:hidden items-center bg-white justify-between p-4 shadow-md'>
      <button onClick={() => dispatch(toggleSidebar())}>
        <FiMenu className="w-8 h-8"/>
      </button>
      <NavLink to={"/"}>
        <img src={logo} alt="logo" className="w-[140px]"/>
      </NavLink>
      <NavLink to={"/"}>
        <div className="w-10 h-10 rounded-full bg-gray-300">

        </div>
      </NavLink>
    </div>
  )
}

export default Navbar;