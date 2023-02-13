import { useState, useEffect } from "react";

interface Options {
  onError: () => void,
  onSuccess: () => void,
}
/**
 * fetcing data and giving loading and error state , also includes succes and error callback
 * @param promise 
 * @param options 
 * @returns 
 * 
 */



interface Return<T>{
   data: T[]| []; isLoading: boolean ; error: string;  refresh : () => void
}


const useFetch = <T>(
  promise: Promise<T>,
  options?: Options
): Return<T>  => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isRefresh , setIsRefresh] = useState(false);


  const refresh = () => {
    setIsRefresh(true);
  }

  useEffect(() => {
    setIsLoading(true);

    promise
      .then((response : any) => {
        setData(response.data.result);
        options?.onSuccess()
      })
      .catch((error) => {
        setError(error);
        options?.onSuccess()
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefresh(false);
      })
  },[isRefresh]);

  return { data, isLoading, error , refresh };
};



export default useFetch;
