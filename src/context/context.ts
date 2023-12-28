import { createContext, useContext } from "react";

// const MyContext = createContext({ token: "" });

interface MyContextProps {
  token: string | null;
}

const MyContext = createContext<MyContextProps>({ token: "" });

export default MyContext;

export const useAuth = () => {
  return useContext(MyContext);
};
