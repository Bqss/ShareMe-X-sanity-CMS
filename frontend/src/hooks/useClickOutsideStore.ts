import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

interface param {
  name: string;
  handler: AnyAction;
}

const useClickOutsideStore = ({ name, handler }: param) => {
  const { open } = useSelector((state: any) => state[name]);
  const elementRef = useRef<Element>(null);
  const dispatch = useDispatch();

  const check = (ev: MouseEvent) => {
    if (elementRef && !elementRef.current?.contains(ev.target as Node)) {
      dispatch(handler);
    }
  };

  useEffect(() => {

    document.addEventListener("mousedown", check);
    return () => {
      document.removeEventListener("mousedown", check);
    }
  }, [elementRef]);

  return [open, elementRef];
};

export default useClickOutsideStore;
