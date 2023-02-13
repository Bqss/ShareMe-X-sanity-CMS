import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-[75vh] mx-auto bg-white  rounded-xl">
      <PuffLoader size={50} color={"#d63674"}/>
    </div>
  )
}

export default Loader;