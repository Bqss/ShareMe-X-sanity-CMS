import bg from "./../../assets/share.mp4";
import logo from "./../../assets/logowhite.png";
import { FcGoogle } from "react-icons/fc";
import {  useGoogleLogin } from "@react-oauth/google";
import {  useNavigate } from "react-router-dom";
import { saveUser } from "./../../api/user";
import { getUserInformation } from "../../util/sanity";
import { setUser } from "../../fitures/userSlice";
import { useDispatch } from "react-redux";


const Login = () => {

  const navigate =  useNavigate();
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const userData = await getUserInformation(response.access_token);
      const {resourceName, names, photos}= userData;
      const user = {
        userId : resourceName?.split("/")[1]??"",
        username : names[0]?.displayName??"",
        image : photos[0]?.url??""
      }
      localStorage.setItem("user",JSON.stringify(user))
      const doc = {
        _id : user?.userId,
        _type: "user",
        userName: user?.username,
        image : user?.image
      }
      saveUser(doc, () => {
        dispatch(setUser(user));
        navigate("/", {replace: true});
      })
    },
    onError: (message) => console.log(message),
    flow : "implicit",
  }); 

  return (
    <div className=" h-screen">
      <div className="relative h-full flex items-center justify-center">
        <video
          src={bg}
          typeof="video/mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div className="flex flex-col absolute items-center justify-center inset-0 bg-blackOverlay">
          <div className="w-32 mb-4">
            <img src={logo} alt="logo" />
          </div>

          <button
            className="inline-flex items-center gap-2 bg-white py-3 px-5 rounded-md shadow-md"
            onClick={() => login()}
          >
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
