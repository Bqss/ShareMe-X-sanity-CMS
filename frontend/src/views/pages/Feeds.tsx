import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPin } from "../../api/pins";
import { RootState } from "../../store";
import { useEffect } from "react";
import { PinPayload } from "../../types/typing";

import Pin from "../components/Pin";
import MasonryLayout from "../layout/MasonryLayout";
import { PuffLoader } from "react-spinners";
import Loader from "../components/Loader";

const Feeds = () => {
  const { category = "" } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
  const { data: pins = [], isLoading, mutate } = useMutation(getPin);

  useEffect(() => {
      mutate(category);

  }, [category]);

  return (
    <div className="">
      {isLoading ? (
        <Loader/>
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
  );
};

export default Feeds;
