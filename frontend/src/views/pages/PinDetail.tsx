import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPinById, saveComment } from "../../api/pins";
import { urlFor } from "../../client";
import { RootState } from "../../store";
import {MoonLoader, PuffLoader} from "react-spinners";
import Comment from "../components/Comment";
import Loader from "../components/Loader";

const PinDetail = () => {
  const { id = "" } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state: RootState) => state.user);
  const qc = useQueryClient();
  const { data,  isRefetching, isLoading, remove} = useQuery("pinDetail", () => getPinById(id), {
    refetchOnWindowFocus: false,  
  });

  useEffect(()=>{
    return () => {
      remove();
    }
  },[])

  const { isLoading: savingComent, mutate } = useMutation(saveComment , {
    onSuccess() {
      qc.invalidateQueries("pinDetail");
      setComment("");
    },  
  });

  const createComment = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    mutate({ pinId : id, comment, userId: user.userId });
  };

  return isLoading ? (
    <Loader/>
  ) : (
    <div className="max-w-[95rem] rounded-xl flex flex-col xl:flex-row mx-auto bg-white">
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
          <p className="text-base md:text-lg font-light ">{data?.at(0)?.about}</p>
          <div className="inline-flex items-center gap-4 ">
            <img
              src={user.image}
              alt="profile"
              className="h-10 w-10 md:w-12 md:h-12 rounded-full"
            />
            <span className=" md:text-base">{user.username}</span>
          </div>
          <div className="">
            <h3 className=" md:text-lg border-b-2 border-gray-200">Comments</h3>
            <div className="flex flex-col mt-6 gap-2 md:gap-3 max-h-[30vh] overflow-auto">
              {data?.at(0)?.comments?.map((comment, i) => (
                <Comment key={i} data={comment} />
              ))}
            </div>
          </div>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={createComment}>
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
              {savingComent ? 
              <div className="inline-flex items-center gap-2">
                <span>Creating</span>
                <MoonLoader size={14} color={"#ffffff"} />
              </div>
              :
             <span className="text-sm ">Add Comment</span>
            }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
