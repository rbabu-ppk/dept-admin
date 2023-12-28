import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Table from "./components/pages/Table";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";
import React, { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import PageNotFound from "./components/auth/PageNotFound";
import Login from "./components/auth/Login";
import MyContext from "./context/context";

const App: React.FC = () => {
  const handleSubmit = (token: string) => {
    if (token) {
      setToken(token);
    }
  };

  const [token, setTokenState] = useState(() => {
    return localStorage.getItem("token");
  });

  const setToken = (newToken: string) => {
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
