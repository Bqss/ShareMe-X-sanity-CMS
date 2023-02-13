import { Save } from "../types/typing";


const imageType = ["image/png", "image/svg", "image/jpeg", "image/gif", "image/webp"];

const isSaved = (save : Save[] ,  userId: string) : [boolean, number] => {
  const length = save?.filter(s => s.userId === userId).length;
  return [(length > 0), length];
}

const validateImage = (image? : File| null|undefined|null) => {
  let result = false;
  imageType.forEach(imageType => {
    if(image?.type == imageType){
      result = true ;
      return ;
    }
  })
  return result;
}


export {isSaved, validateImage}