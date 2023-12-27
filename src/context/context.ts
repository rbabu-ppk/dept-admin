import { createContext, useContext } from "react";

const MyContext = createContext({ token: "" });

export default MyContext;

export const useAuth = () => {
  return useContext(MyContext);
};
