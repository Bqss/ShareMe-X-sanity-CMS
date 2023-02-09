import axios from "axios";



export const getUserInformation = async (accessToken: string) => {
  const headers = {
    Authorization : `Bearer ${accessToken}`
  }
  return await axios.get("https://people.googleapis.com/v1/people/me?personFields=photos,names,emailAddresses", {headers})
  .then(response => {
    return  response.data;
  }).catch(err => {
    console.log(err);
  })
}


