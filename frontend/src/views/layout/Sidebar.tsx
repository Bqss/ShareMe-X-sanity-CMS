import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import A from "../components/A";
import { categories } from "../../util/data";

const Sidebar = () => {
  return (
    <div className=" flex sticky top-0 bg-white flex-col h-screen">
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
          <span className="relative after:absolute after:w-[90%] after:h-[1.5px] after:shadow-sm after:left-0 after:-bottom-2 after:bg-gradient-to-r after:from-red-500 after:to-yellow-500 after:rounded-full  ">Discover Categories</span>
          <ul className="flex flex-col gap-2 mt-5">
            {categories.map((value, id) => (
              <li key={id}>
                <A
                  to={`/category/${value.name}`}
                  unactive="after:bg-transparent font-thin"
                  active="after:bg-black font-bold"
                  className="inline-flex gap-3 items-center"
                >
                  <img src={value.image} alt={value.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="capitalize ">{value.name}</span>
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
