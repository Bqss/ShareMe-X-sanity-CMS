import { CommentProps } from "../../types/typing"
import {memo} from "react";
import { useQuery } from "react-query";
import { getUserById } from "../../api/user";

interface Props {
  data : CommentProps;
}



const Comment = memo(({data}:Props) => {
  const {postedBy, comment} = data;   
  const {data : user ,isLoading } = useQuery("comment", () => getUserById(postedBy._ref),{
    refetchOnWindowFocus : false
  });

  const d = user?.at(0);

  return (
    !isLoading ? (<div className="flex  gap-2">
      <img src={d.image} className="w-10 h-10 rounded-full"  />
      <div className="">
        <span className="font-bold">{d.userName}</span>
        <p className="text-sm">{comment}</p>
      </div>
    </div>) : 
    <div>Loading</div>
  )
})
export default Comment