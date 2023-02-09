import { AnyAction } from "redux"

import {useState, useEffect} from "react";

type size = "xs"|"sm"|"md"|"lg"|"xl"
const sizeChart =  {
  xs : 375,
  sm : 468,
  md: 576,
  lg: 768,
  xl: 1080
}

const useMediaQuery = ( size : size) => {
  const query = `(max-width: ${sizeChart[size]}px)`;
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
}

export default useMediaQuery;