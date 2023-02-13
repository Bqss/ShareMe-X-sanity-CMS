import client from "../client";
import {v4 as uuidv4} from "uuid";
import Axios from "./axios";
import { Data, PinPayload, PostedBy, UserPayload } from "../types/typing";
import { SanityImageAssetDocument } from "@sanity/client";



const getPin = async (category: string) => {
  const query = `*[_type=="pin"${category? `&&category=="${category}"`  : ""}]`
  const result = await Axios.get<Data<PinPayload>>(`production?query=${encodeURIComponent(query)}`);
  return result.data?.result;
}

const getPinById = async (id:string| undefined) => {
  const query = `*[_type=="pin"&&_id=="${id}"]`;
  console.log('fetchinggg')
  const result = await Axios.get<Data<PinPayload>>(`production?query=${encodeURIComponent(query)}`);
  return result.data?.result;
}

const savePin =  (pinId: string, userId: string) => {
  return  client.patch(pinId).setIfMissing({save: []}).insert("after", "save[-1]",[{
    _key : uuidv4(),
    userId,
    postedBy : {
      _type: "postedBy",
      _ref: userId
    }
  }]).commit(); 
}


const createPin = async (Pin : {
  title: string,
  about: string,
  image: SanityImageAssetDocument,
  destination : string,
  category : string
}, user : UserPayload) => {

  const {image, ...pin} = Pin
  const doc = {
    _type : "pin",
    ...pin,
    image: {
      _type : "image",
      asset : {
        _type: 'reference',
        _ref : image._id,
      }
    },
    postedBy : {
      _type: "postedBy",
      _ref: user.userId
    },
    userId: user.userId,
    save : [],
    comments : []
  }

  const result  = await client.create(doc);
  return result;

}

const deletePin = async (pinId: string) => {
  const result = await client.delete(pinId);
  return result;
}

const saveComment = async ({pinId, comment, userId}: {
  pinId: string, comment : string, userId : string
}) => {
  const result = await  client.patch(pinId).setIfMissing({comments: []}).prepend( "comments",[
    {
      _key : uuidv4(),
      _type: "comment",
      comment ,
      postedBy: {
        _ref : userId,
        _type: "postedBy"
      }
    }
  ]).commit();

  return result;
}

const uploadImage = async (image : any) => {
  const result = await  client.assets.upload("image", image ,{filename: image.name});
  return result;
}


export  {savePin, getPin, deletePin, uploadImage, createPin, getPinById, saveComment} ;