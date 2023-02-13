import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useClickOutsideStore } from "../../hooks";
import { closeSidebar } from "../../fitures/sidebarSlice";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setUser } from "../../fitures/userSlice";
import { getUserById } from "../../api/user";
import { useMutation } from "react-query";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmall = useMediaQuery("lg");
  const getUser = useMutation(getUserById, {
    onSuccess(data) {
      const { userName, image, _id } = data[0];
      dispatch(setUser({ username: userName, image, userId: _id }));
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login", { replace: true });
      return;
    }
    const { userId } = JSON.parse(localStorage.getItem("user") || "");
    getUser.mutate(userId);
  }, []);

  const [open, sidebar] = useClickOutsideStore({
    name: "sidebar",
    handler: closeSidebar(),
  });

  return (
    <div className="flex">
      {/* sidebar pc */}
      <div className="hidden md:block w-[220px]">
        <Sidebar />
      </div>
      {/* top */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <Outlet />
      </div>
      {/* sidebar mobile */}
      <Transition show={open && isSmall} as="div">
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          as={Fragment}
        >
          <div
            className="fixed top-0 z-[1] left-0 w-9/12 max-w-sm shadow-xl"
            ref={sidebar}
          >
            <Sidebar />
          </div>
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity  duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity  duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <div className="backdrop-brightness-50 inset-0 z-0 fixed"></div>
        </Transition.Child>
      </Transition>
    </div>
  );
};

export default Home;
