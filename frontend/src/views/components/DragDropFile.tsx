import { SanityImageAssetDocument } from "@sanity/client";
import {  useState, useRef } from "react";
import {ClimbingBoxLoader} from "react-spinners";
import { AiFillDelete } from "react-icons/ai";
import { IoImageOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import { uploadImage } from "../../api/pins";
import client from "../../client";
import { validateImage } from "../../util/other";

interface DragDropFileProps {
  setter : React.Dispatch<React.SetStateAction<any>>,
  image : SanityImageAssetDocument | null | undefined
}

function DragDropFile({setter, image}:DragDropFileProps) {
  const [onDragOver, setDragOver] = useState(false);
  const [wrongType, setWrongType] = useState(false);
  const main = useRef<any>();

  const { mutate: uploadImg, isLoading: isUpdloading } = useMutation(
    uploadImage,
    {
      onSuccess(data) {
        setter(data);
      },
    }
  );

  const deleteImage = async (image: SanityImageAssetDocument) => {
    if (image) {
      const result = await client.delete(image?._id);
      setter(null);
      setDragOver(false);
    }
  };

  function handleDrop(ev: React.DragEvent) {
    ev.preventDefault();
    if (validateImage(ev.dataTransfer.files[0])) {
      uploadImg(ev.dataTransfer.files[0]);
      setWrongType(false);
      return ;
    }
    setWrongType(true);
  }
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    if (validateImage(ev.target?.files?.item(0))) {
      uploadImg(ev.target?.files?.item(0));
      setWrongType(false);
      return ;
    }
    setWrongType(true);
  };

  return (
    <div
      className="flex-1 p-5 rounded-md bg-gray-200/75 aspect-square lg:max-h-[55vh] "
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      onDragOver={(ev) => ev.preventDefault()}
      onDrop={handleDrop}
    >
      <div
        className={
          "w-full pointer-events-none relative  h-full rounded-sm border-2 border-gray-500 border-dotted" +
          (onDragOver ? " bg-cyan-800/10   border-black" : wrongType ? " border-red-600 bg-red-800/10": "")
        }
      >
        {!image ? (
          <>
            <div className="flex items-center justify-center h-full ">
              {isUpdloading ? 
                (<div className="flex flex-col justify-center gap-2">
                  <ClimbingBoxLoader size={12}/>
                  <span className="text-center">Uploading</span>
                </div>)
                :
                (<>
                  <div className="flex relative items-center space-y-2 flex-col">
                    {wrongType && <span className="text-red-500 absolute text-sm md:text-base -top-10 block mb-2" >Image Format is unsupport !!</span>}
                    <IoImageOutline className="w-8 h-8" />
                    <span className="text-sm md:text-base  ">
                      {onDragOver
                        ? "Drop to Upload"
                        : "Click to Upload or Drag here"}
                    </span>
                    {!onDragOver && (
                      <button
                        className="bg-gray-300/60 shadow-md py-1 px-3 rounded-md hover:bg-gray-300/100 pointer-events-auto"
                        onClick={() => main?.current?.click()}
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </>)
              }
            </div>
            <div className="px-4 absolute bottom-[5%] z-0 w-full">
              <p className="text-xs md:text-sm text-gray-500 text-center">
                Recomendation, to use high-quality JPG, JPEG, SVG, PNG and less
                than 20MB
              </p>
            </div>
            <input
              type="file"
              name="image"
              className="w-0 h-0"
              id=""
              ref={main}
              onChange={handleChange}
            />
          </>
        ) : (
          <div className="w-full h-full relative p-3 md:p-5">
            <img
              src={image.url}
              alt={image.originalFilename}
              className="w-full h-full object-contain"
            />
            <button
              className="absolute bg-white/50 p-1 rounded-full right-3 bottom-3 pointer-events-auto hover:bg-white "
              onClick={() => deleteImage(image)}
              title="Delete Image"
            >
              <AiFillDelete className="w-5 h-5 " />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DragDropFile;
