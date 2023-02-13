import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {RiErrorWarningLine} from "react-icons/ri";
import { useState } from "react";
import DragDropFile from "../components/DragDropFile";
import { SanityImageAssetDocument } from "@sanity/client";
import { createPin } from "../../api/pins";
import { useNavigate } from "react-router-dom";
import {categories} from "./../../util/data"; 

const CreatePin = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<SanityImageAssetDocument | null>();
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const [pin, setPin] = useState({
    title: "",
    about: "",
    destination: "",
    category: "",
  });

  const handleChange = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPin({
      ...pin,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (image && pin.title && pin.about && pin.destination && pin.category) {
      createPin({ ...pin, image }, user).then(() => {
        navigate("/");
      });
      return;
    }
    setFailed(true);
    setTimeout(() => {
      setFailed(false);
    }, 2000);
  };

  return (
    <section className="flex rounded-md justify-center mt-6 mx-5">
      <div className="w-full relative flex gap-4 lg:gap-0 flex-col lg:flex-row max-w-7xl rounded-md bg-white p-5">
        {failed && (
          <div className=" bg-red-500 z-20 absolute p-4 rounded-md flex items-center gap-4 top-1/3 left-1/2 -translate-x-1/2">
            <RiErrorWarningLine className="w-8 h-8 "/>
            <span>Please fill all form </span>
          </div>
        )}
        <DragDropFile setter={setImage} image={image} />
        <form
          onSubmit={handleSubmit}
          className=" space-y-4 flex justify-center  flex-col flex-1 py-1 md:py-4 px-6"
        >
          <input
            type="text"
            name="title"
            id=""
            onChange={handleChange}
            value={pin.title}
            className="w-full border-b-2 border-gray200  md:text-xl"
            placeholder="Add your title"
          />
          <div className="flex flex-col py-1 md:py-4">
            <div className="flex gap-2 items-center ">
              <img
                src={user.image}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <span>{user.username}</span>
            </div>
            <textarea
              name="about"
              id="about"
              onChange={handleChange}
              value={pin.about}
              placeholder="Tell everyone what your pin is about"
              className="w-full text-sm md:text-base border-b-2 border-gray-200 mt-2 md:mt-6 resize-none py-[.4em]"
            />
            <input
              type="text"
              name="destination"
              value={pin.destination}
              id=""
              onChange={handleChange}
              className="w-full text-sm md:text-base border-b-2 mt-2 border-gray-200 py-[.4em]"
              placeholder="Add destination link "
            />
            <div className="mt-6 ">
              <label className="flex flex-col gap-2">
                <span className="md:text-base">Select Pin Category</span>
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  defaultValue={pin.category}
                  className="py-[.4em] px-2 outline-none border-b-2 text-sm md:text-base text-gray-400 border-gray-300"
                >
                  <option value={""} disabled>
                    Select Category
                  </option>
                  {categories.map((category,i) => (
                    <option value={category.name} key={i}>{category.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="ml-auto bg-pink-600/75 hover:bg-pink-600 px-5 py-2 rounded-md mt-10 text-white"
            >
              Create Pin
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePin;
