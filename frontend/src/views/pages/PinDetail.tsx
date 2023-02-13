import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { getPinById, saveComment } from "../../api/pins";
import { urlFor } from "../../client";
import { RootState } from "../../store";
import { MoonLoader } from "react-spinners";
import Comment from "../components/Comment";
import Loader from "../components/Loader";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import useMediaQuery from "../../hooks/useMediaQuery";

const PinDetail = () => {
  const { id = "" } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state: RootState) => state.user);
  const isSmall = useMediaQuery("lg");
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isRefetching, isLoading, remove } = useQuery(
    "pinDetail",
    () => getPinById(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    return () => {
      remove();
    };
  }, []);

  const { isLoading: savingComent, mutate } = useMutation(saveComment, {
    onSuccess() {
      qc.invalidateQueries("pinDetail");
      setComment("");
    },
  });

  const createComment = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    mutate({ pinId: id, comment, userId: user.userId });
  };

  return (
    <div className="mx-5">
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

      <div className="max-w-[95rem] mt-6 rounded-xl flex flex-col xl:flex-row mx-auto bg-white">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex-1 rounded-xl bg-gray-400/50 ">
              <img
                src={urlFor(data?.at(0)?.image)?.url()}
                alt={data?.at(0)?.title}
                className="w-full aspect-square object-contain rounded-xl"
              />
            </div>
            <div className="flex-1 p-6  ">
              <div className="flex flex-col gap-4 ">
                <h2 className="text-xl md:text-2xl xl:text-3xl font-bold capitalize">
                  {data?.at(0)?.title}
                </h2>
                <p className="text-base md:text-lg font-light ">
                  {data?.at(0)?.about}
                </p>
                <div className="inline-flex items-center gap-4 ">
                  <img
                    src={user.image}
                    alt="profile"
                    className="h-10 w-10 md:w-12 md:h-12 rounded-full"
                  />
                  <span className=" md:text-base">{user.username}</span>
                </div>
                <div className="">
                  <h3 className=" md:text-lg border-b-2 border-gray-200">
                    Comments
                  </h3>
                  <div className="flex flex-col mt-6 gap-2 md:gap-3 max-h-[30vh] overflow-auto">
                    {data?.at(0)?.comments?.map((comment, i) => (
                      <Comment key={i} data={comment} />
                    ))}
                  </div>
                </div>
                <form
                  className="flex flex-col sm:flex-row gap-2"
                  onSubmit={createComment}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <input
                      type="text"
                      name="comment"
                      id="comment"
                      value={comment}
                      onChange={(ev) => setComment(ev.target.value)}
                      className=" px-4 py-2 flex-1 text-sm  rounded-lg border border-gray-300"
                      placeholder="Add Comment"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-pink-600/75 inline-flex justify-center items-center ml-auto hover:bg-pink-600 px-4 py-2 text-white text-sm  rounded-full"
                  >
                    {savingComent ? (
                      <div className="inline-flex items-center gap-2">
                        <span>Creating</span>
                        <MoonLoader size={14} color={"#ffffff"} />
                      </div>
                    ) : (
                      <span className="text-sm ">Add Comment</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PinDetail;
