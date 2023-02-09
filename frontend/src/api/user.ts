import { AnyAction } from "redux";
import client from "../client";
import { User } from "../types/payload";

export const saveUser = async (user: User, onSucces: () => void) => {
  client.createIfNotExists(user).then(() => {
    onSucces();
  });
};


interface params {
  userId: string,
  onSucces: (response: any) => void  ,
  onFailed: (err : any) => void
}
export const getUserById = async ({
  userId,
  onSucces,
  onFailed
}:params ) => {
  const query = `*[_type=="user"&& _id=="${userId}"]`;
  const user = client.fetch(query).then(onSucces).catch(onFailed)
};
