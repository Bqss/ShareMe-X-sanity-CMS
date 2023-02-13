import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {  searchPin } from "../../api/pins";
import useMediaQuery from "../../hooks/useMediaQuery";
import { RootState } from "../../store";
import {useRef, useEffect, useState} from "react";
import Loader from "../components/Loader";
import Pin from "../components/Pin";
import MasonryLayout from "../layout/MasonryLayout";

const Search = () => {

  const { user } = useSelector((state: RootState) => state.user);
  const { data: pins=[] , isLoading, mutate } = useMutation(searchPin);
  const isSmall = useMediaQuery("lg");
  const search = useRef<any>();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    search.current?.focus();
  }, [])
  useEffect(() => {
    mutate(searchTerm??"");
  }, [searchTerm])

  
  return (
    <div className="">
      <div className="flex px-5 mt-4 items-stretch gap-5">
        {/* search bar */}
        <div className="flex bg-white px-4 py-1 items-center w-full rounded-md shadow-sm">
          <div>
            <BiSearch className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="flex-1 ml-2 bg-transparent  border-0 outline-none"
            placeholder="Search...."
            onChange={(ev) => setSearchTerm(ev.target.value)}
            ref={search}
          />
        </div>
        <div className="flex gap-2">
          {!isSmall && (
            <Link to={`/user-profile/${user.userId}`}>
              <img
                src={`${user.image}`}
                alt="profile"
                className="w-12  rounded-md"
              />
            </Link>
          )}
          <NavLink
            to={"/create-pin"}
            className={
              "rounded-md w-12 aspect-square inline-grid place-content-center bg-black"
            }
          >
            <AiOutlinePlus className="w-4 h-4 text-white" />
          </NavLink>
        </div>
      </div>
      <div className="mx-5 mt-6">
        {isLoading ? (
          <Loader />
        ) : pins?.length > 0 ? (
          <MasonryLayout>
            {pins.map((pin, i) => (
              <Pin pin={pin} key={i} user={user} />
            ))}
          </MasonryLayout>
        ) : (
          "There is no pin"
        )}
      </div>
    </div>
  );
};

export default Search;
