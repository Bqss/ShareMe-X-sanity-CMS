import client from "../client";



const getPins =  (category?: string) => {
  const query = `*[_type=="pin"${category? `&& category==${category}`  : "" }]`
  return client.fetch(query);
}



export  {getPins} ;