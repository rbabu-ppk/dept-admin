import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import * as api from "../services/apiServices";
import Layout from "./layouts/Layout";

const columns: GridColDef[] = [
  { field: "firstname", headerName: "First Name", flex: 1 },
  { field: "lastname", headerName: "Last Name", flex: 1 },
  { field: "middlename", headerName: "Middle Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "lastLoggedInDate", headerName: "Last LoggedInDate", flex: 1 },
];

const Table: React.FC = () => {
  const [datas, setDatas] = useState([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const handleCellClick = (params) => {
    const id = params.row.id;
    setSelectedId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.showData();
        const formattedData = Object.values(response).map((obj) => ({
          id: obj._id,
          ...obj,
        }));
        setDatas(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div style={{ height: 400, width: "100%" }}>
        <Button component={Link} to="/add" variant="contained" color="primary">
          Add Department Admin
        </Button>
        <Button
          component={Link}
          to={`/edit/${selectedId}`}
          variant="contained"
          color="primary"
        >
          Edit Department Admin
        </Button>
        <Button
          component={Link}
          to={`/edit/${selectedId}`}
          variant="contained"
          color="primary"
        >
          Delete Department Admin
        </Button>
        {/* {selectedId && (
        <Button
          component={Link}
          to={`/edit/${selectedId}`}
          variant="contained"
          color="primary"
        >
          Edit Department Admin
        </Button>
      )} */}
        <DataGrid
          rows={datas}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) =>
            setSelectionModel(newSelectionModel)
          }
          onCellClick={handleCellClick}
        />
      </div>
    </Layout>
  );
};

export default Table;
