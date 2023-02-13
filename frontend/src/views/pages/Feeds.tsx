import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { getPin } from "../../api/pins";
import { RootState } from "../../store";
import { useEffect, useState } from "react";

import Pin from "../components/Pin";
import MasonryLayout from "../layout/MasonryLayout";
import Loader from "../components/Loader";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import useMediaQuery from "../../hooks/useMediaQuery";

const Feeds = () => {
  const { category = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const {data : pins =[] , refetch, isRefetching } = useQuery("pins" ,() => getPin(category))

  const isSmall = useMediaQuery("lg");

  useEffect(() => {
    refetch();
  }, [category]);

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
            onFocus={() => navigate("/search")}
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
        {isRefetching ? (
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

export default Feeds;
