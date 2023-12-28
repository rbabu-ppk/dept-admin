import { createContext } from "react";

interface MyContextProps {
  token: string | null;
}

const MyContext = createContext<MyContextProps>({ token: "" });

export default MyContext;
