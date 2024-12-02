import { createContext } from "react";
import { IContextValueType } from "./types";

export const StateContext = createContext<IContextValueType>(
  {} as IContextValueType,
);
