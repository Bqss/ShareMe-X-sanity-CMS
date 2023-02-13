import createClient from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";

const client = createClient({
  projectId : `${import.meta.env.VITE_SANITY_PROJECT_ID}`,
  dataset : "production",
  useCdn : true,
  apiVersion : "2021-10-21",
  token : `${import.meta.env.VITE_SANITY_API_TOKEN}`,
});


const builder = ImageUrlBuilder( client);

const urlFor = (source : any) => builder.image(source);

export default client;

export {urlFor};


