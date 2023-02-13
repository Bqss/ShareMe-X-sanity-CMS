import { useSelector } from "react-redux";
import {useEffect, useState} from "react"
import { getPin, getSavedPin } from "../../api/pins";
import { RootState } from "../../store";
import Pin from "../components/Pin";
import MasonryLayout from "../layout/MasonryLayout";
import { PinPayload } from "../../types/typing";

function Profile() {
  const { user } = useSelector((state: RootState) => state.user);
  const [opt, setOpt] = useState("created"); 
  const [filteredPin, setFilteredPin] = useState<PinPayload[]|[]>([]);

  const fetchOpt = async(opt : string) => {

    switch(opt){
      case "created" :
        let result = await getPin("");
        result = [...result.filter(pin => pin.postedBy._ref ===user.userId)]
        setFilteredPin(result);
        break;
      case "saved":
        const saved = await getSavedPin(user?.userId);
        setFilteredPin(saved);
        break;
    }
  }

  useEffect(()=>{
    opt && user && fetchOpt(opt);
  },[opt, user])

  return (
    <div className="">
      <img
        src="https://source.unsplash.com/1600x900/?nature,photography,technology"
        alt="bg"
        className="w-full h-[40vh] lg:h-[50vh] object-cover"
      />
      <div className="flex flex-col w-full items-center gap-4 relative -top-8 md:-top-10">
        <img
          src={user.image}
          alt={user.username}
          className="w-16 md:w-20 aspect-square rounded-full shadow-lg"
        />
        <h2 className="font-bold text-2xl md:text-4xl ">{user.username}</h2>
        <div className="flex gap-2 mt-4">
          <button className={"px-6 py-2 rounded-full shadow-md "+ (opt == "created" ? "bg-pink-500 text-white":"" )} onClick={() => {
            setOpt("created")
          }}>Created</button>
          <button className={"px-6 py-2 rounded-full shadow-md "+ (opt == "saved" ? "bg-pink-500 text-white":"" )} onClick={() => {
            setOpt("saved")
          }}>Saved</button>
        </div>
      </div>
      <div className="mx-5 py-10 max-h-[100vh] overflow-auto ">
        {filteredPin?.length > 0 ? (
          <MasonryLayout>
            {filteredPin.map((pin, i) => (
              <Pin pin={pin} key={i} user={user} />
            ))}
          </MasonryLayout>
        ) : (
          <span>There is no pin</span>
        )}
      </div>
    </div>
  );
}

export default Profile;
