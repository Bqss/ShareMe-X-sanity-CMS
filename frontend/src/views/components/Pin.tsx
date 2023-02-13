import { Link, useNavigate } from "react-router-dom";
import { urlFor } from "../../client";
import { memo } from "react";
import { BsDownload } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PinPayload, UserPayload } from "../../types/typing";
import { isSaved } from "../../util/other";
import { deletePin, savePin } from "../../api/pins";
import { useMutation, useQueryClient } from "react-query";

interface PinProps {
  pin: PinPayload;
  user: UserPayload;
}

const Pin = memo(({ pin, user }: PinProps) => {
  const navigate = useNavigate();
  const { _id, title, image, destination, save, postedBy } = pin;
  const queryClient = useQueryClient();
  const savePinMutation = useMutation(() => savePin(_id, user.userId), {
    onSuccess: () => queryClient.invalidateQueries("pins"),
  });
  const deletePinMutation = useMutation(() => deletePin(_id), {
    onSuccess: () => queryClient.invalidateQueries("pins"),
  });
  const [saved, length] = isSaved(save, user.userId);
  const handleSave = () => {
    !saved && savePinMutation.mutate();
  };
  const handleDelete = () => {
    deletePinMutation.mutate();
  };

  return (
    <div className="bg-white rounded-xl">
      <div
        onClick={() => navigate(`/pin/${_id}`)}
        className="hover:cursor-pointer group relative"
        title="See detail"
      >
        <div className="min-h-[8rem] ">
          <img
            src={urlFor(image).url()}
            alt={title}
            className="rounded-xl w-full  object-cover"
          />
        </div>
        <div className="invisible flex absolute inset-0 group-hover:visible flex-col p-3 justify-between transition-opacity opacity-0 group-hover:opacity-100 duration-500 backdrop-brightness-75 rounded-lg">
          <div className="flex justify-between ">
            <a
              className="p-2 rounded-md bg-white/70 hover:bg-white "
              title="Download image"
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              href={`${urlFor(image).url()}?dl=`}
            >
              <BsDownload className="w-4 h-4 " />
            </a>
            <button
              className="px-5 py-1 rounded-full bg-red-500/70 hover:bg-red-500 text-white text-sm"
              title="save pin"
              onClick={(ev) => {
                ev.stopPropagation();
                handleSave();
              }}
            >
              {!saved ? "Save" : `${length} Saved`}
            </button>
          </div>
          <div className="flex justify-between">
            <Link
              to={"/"+destination ?? "asf"}
              className="bg-white/70 hover:bg-white px-4 py-2 rounded-full text-sm "
              title="go to source"
            >
              {`Source : "${destination ?? "asdfsd"}" `}
            </Link>
            {postedBy._ref === user.userId && (
              <button
                className="bg-white/70 hover:bg-white  py-1 px-[.65rem] inline-flex items-center  rounded-md text-sm "
                title="delete"
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleDelete();
                }}
              >
                <RiDeleteBin5Line className="w-4 h-auto" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Link
        to={`/user-profile/${user.userId}`}
        className="inline-flex gap-3 items-center py-2 px-1"
      >
        <img
          src={user.image}
          alt={user.username + " profile"}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-medium capitalize">{user.username}</span>
      </Link>
    </div>
  );
});

export default Pin;
