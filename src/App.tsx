import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Table from "./components/Table";
import Add from "./components/Add";
import Edit from "./components/Edit";
import React, { useContext, useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import PageNotFound from "./components/pages/PageNotFound";
import Login from "./components/pages/Login";
import MyContext from "./context/context";

export const useAuth = () => {
  return useContext(MyContext);
};
const App: React.FC = () => {
  const handleSubmit = (token: string) => {
    setToken(token);
  };

  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <>
      <MyContext.Provider value={{ token }}>
        <div>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Login sendToken={handleSubmit} />}
              ></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/table" element={<Table />}></Route>
              <Route path="/add" element={<Add />}></Route>
              <Route path="/edit/:selectedId" element={<Edit />}></Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </MyContext.Provider>
    </>
  );
};

export default App;
