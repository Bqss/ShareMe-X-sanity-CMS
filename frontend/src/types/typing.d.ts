export interface User {
  _id : string
  _type: string,
  userName : string,
  image : string
}

export interface UserPayload{
  userId: string,
  username : string,
  image : string
} 

interface PostedBy {
  _ref : string,
  _type : string
}

export interface PinPayload {
  _id: string,
  title: string,
  about: string,
  destination : string,
  category: string,
  image: {
    asset: {
      _ref : string,
      _type: string,
    }
    _type: string
  },
  userId : string,
  postedBy: PostedBy,
  save: [],
  comments: []
}


export interface  Data<T> {
  result : T[]
}

export interface Save {
  postedBy : User,
  userId : string
}

export interface CommentProps{
  _key : string,
  _type : string,
  postedBy : {
    _ref : string,
    _type : "postedBy",
  },
  comment: string
}












































