import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Table from './components/Table'
import Add from './components/Add';
import Edit from './components/Edit';
import React from 'react';
import MiniDrawer from './components/dashboard/Dashboard';
import MyForm1 from './components/Add';

const App: React.FC = () => {


  const data = [
    { id: 1, firstName: 'John', lastName: 'Doe', middleName: 'DMid', email: 'john.doe@example.com', lastLoggedInDate: '2023-01-01' },
  ];

  return (
    <>
      
      <BrowserRouter>
        <Routes>  
          <Route path='/' element={<MiniDrawer />}></Route>
          <Route path='/table' element={<Table data={data} />}></Route>
          <Route path='/add' element={<Add />}></Route>
          <Route path='/edit' element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
      </>
  );
};

export default App;
