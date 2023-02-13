import axios from "axios";

const Axios = axios.create({
  baseURL : `https://${import.meta.env.VITE_SANITY_PROJECT_ID}.api.sanity.io./v2021-10-21/data/query/` 
});


export default Axios ;