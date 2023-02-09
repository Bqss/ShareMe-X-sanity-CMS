import createClient from "@sanity/client";
import {User} from "./types/payload";

const client = createClient({
  projectId : `${import.meta.env.VITE_SANITY_PROJECT_ID}`,
  dataset : "production",
  useCdn : true,
  apiVersion : "2023-01-07",
  token : `${import.meta.env.VITE_SANITY_API_TOKEN}`
});

export default client;


