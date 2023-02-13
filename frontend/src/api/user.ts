import { AnyAction } from "redux";
import client from "../client";
import { User } from "../types/typing";

export const saveUser = async (user: User, onSucces: () => void) => {
  client.createIfNotExists(user).then(() => {
    onSucces();
  });
};

interface params {
  userId: string;
  onSucces?: (response: any) => void;
  onFailed?: (err: any) => void;
}
export const getUserById = async (userId : string|null|undefined ) => {
  if(!userId) return;
  const query = `*[_type=="user"&& _id=="${userId}"]`;
  const result = await client.fetch(query);
  return result;
};
