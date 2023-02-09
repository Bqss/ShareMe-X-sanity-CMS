import logo from "./../../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { forwardRef } from "react";
import A from "../components/A";

const categories = [
  { name: "animals" },
  { name: "walpapers" },
  { name: "photography" },
  { name: "gaming" },
  { name: "coding" },
  { name: "other" },
];

const Sidebar = () => {
  return (
    <div className=" flex bg-white flex-col h-screen">
      <Link to={"/"} className="px-6 py-6">
        <img src={logo} alt="logo" className="w-[140px]" />
      </Link>
      <nav className="mt-4 pl-6 pr-1">
        <ul>
          <li>
            <A
              to={"/"}
              className="flex w-full items-center gap-4"
              unactive="after:bg-transparent text-thin  "
              active="after:bg-black font-bold"
            >
              <AiFillHome className="w-4 h-4" />
              <span>Home</span>
            </A>
          </li>
        </ul>
        <div className="fex flex-col gap-3 mt-5">
          <span>Discover Categories</span>
          <ul className="flex flex-col gap-2 mt-3">
            {categories.map((value, id) => (
              <li key={id}>
                <A
                  to={`/category/${value.name}`}
                  unactive="after:bg-transparent font-thin"
                  active="after:bg-black font-bold"
                >
                  <span className="capitalize">{value.name}</span>
                </A>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
