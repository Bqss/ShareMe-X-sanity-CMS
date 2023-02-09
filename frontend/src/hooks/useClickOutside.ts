import { useRef, useState, useEffect } from "react";

const useClickOutside = (initialState : boolean)  => {
  const [isOpen, setisOpen] = useState(initialState);
  const elementRef = useRef<Element>(null);

  const handleClickOutsie = (ev : MouseEvent) => {
    if(elementRef.current && !elementRef.current.contains(ev.target as Node)){
      setisOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown",handleClickOutsie);
    return () => {
      document.removeEventListener("mousedown",handleClickOutsie);
    }
  }, [elementRef]);
  

  return [isOpen, elementRef, setisOpen];

}



export default useClickOutside;