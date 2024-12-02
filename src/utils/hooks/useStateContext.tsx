import { StateContext } from "@/context/stateContext";
import { useContext } from "react";

export const useStateContext = () => {
  const context = useContext(StateContext);
  return context;
};
