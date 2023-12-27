import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Table from "./components/Table";
import Add from "./components/Add";
import Edit from "./components/Edit";
import React from "react";
import MiniDrawer from "./components/layouts/MiniDrawer";
import Dashboard from "./components/dashboard/Dashboard";
import PageNotFound from "./components/pages/PageNotFound";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MiniDrawer />}></Route> */}
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/table" element={<Table />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/edit/:selectedId" element={<Edit />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
