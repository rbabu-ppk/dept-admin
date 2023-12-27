import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

interface Data {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  lastLoggedInDate: string;
}

interface TableProps {
  data: Data[];
}



const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'firstname', headerName: 'First Name', flex: 1 },
  { field: 'lastname', headerName: 'Last Name', flex: 1 },
  { field: 'middlename', headerName: 'Middle Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'lastLoggedInDate', headerName: 'Last LoggedInDate', flex: 1 },
];



const CustomTable: React.FC<TableProps> = ({ data }) => {

  const [datas, setDatas] = useState([]);
console.log(datas);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dev-admin.sunrises.io/api/get-departadmins', {headers:{
          // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU4YTZmOTNhMGI4OTk2Y2ZiMTIxYTAwIiwidXVpZCI6IjQzNzUyYmZhLWQ5NjItNGRiZS04Mzk5LWMxYmM2MTRhOWFiMyIsInBhc3N3b3JkX2V4cGlyZWQiOmZhbHNlLCJpYXQiOjE3MDM2MDgyODYsImV4cCI6MTcwMzYxODI4Nn0.OUcRjvUO6UgwJldgiEuYnG5fglxsUHKLUtldsnUOAkg',
        }});
        const formattedData = Object.values(response.data).map((obj) => ({
          id: obj._id,
          ...obj,
        }));
        setDatas(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
    <Button component={Link} to='/add' variant="contained" color="primary">
      Add Department Admin
    </Button>
    <Button component={Link} to='/edit' variant="contained" color="primary">
      Edit Department Admin
    </Button>
      <DataGrid
        rows={datas}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default CustomTable;
