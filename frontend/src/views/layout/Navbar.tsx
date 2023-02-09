import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo.png";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../fitures/sidebarSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Navbar() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="flex md:hidden items-center bg-white justify-between p-4 shadow-md">
      <button onClick={() => dispatch(toggleSidebar())}>
        <FiMenu className="w-8 h-8" />
      </button>
      <Link to={"/"}>
        <img src={logo} alt="logo" className="w-[140px]" />
      </Link>

      <Link to={`user-profile/${user.userId}`}>
        <img
          src={`${user.image}`}
          alt="profile"
          className="w-10 h-10 rounded-full"
          title="go to profile"
        />
      </Link>
    </div>
  );
}

export default Navbar;
