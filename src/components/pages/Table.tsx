import React, { useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import * as api from "../../services/apiServices";
import Layout from "../layouts/Layout";
import MyContext from "../../context/context";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const columns: GridColDef[] = [
  { field: "firstname", headerName: "First Name", flex: 1 },
  { field: "lastname", headerName: "Last Name", flex: 1 },
  { field: "middlename", headerName: "Middle Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "lastLoggedInDate", headerName: "Last LoggedInDate", flex: 1 },
];

const Table: React.FC = () => {
  const [datas, setDatas] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // const [selectionModel, setSelectionModel] = React.useState([]);

  const { token } = useContext(MyContext);

  const handleCellClick = (params: { row: { id: string } }) => {
    const id: string = params.row.id;
    setSelectedId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.showData(token);
        const formattedData = Object.values(response).map((obj: any) => ({
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

  const handleDelete = async () => {
    if (!selectedId) {
      return;
    }
    try {
      await api.deleteData(selectedId, token);
      setDatas((prevDatas) =>
        prevDatas.filter((data) => data.id !== selectedId)
      );
      setSelectedId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Typography variant="h5" align="center" mb={3}>
        Department Admins
      </Typography>
      <Divider />
      <div style={{ height: 400, width: "100%" }}>
        <Button component={Link} to="/add" variant="contained" color="primary">
          Add Department Admin
        </Button>
        <Button
          component={Link}
          to={selectedId ? `/edit/${selectedId}` : "#"}
          variant="contained"
          color="primary"
          disabled={!selectedId}
        >
          Edit Department Admin
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="primary"
          disabled={!selectedId}
        >
          Delete Department Admin
        </Button>

        <DataGrid
          rows={datas}
          columns={columns}
          // pagination
          // pageSize={10}
          // selectionModel={selectionModel}
          // onSelectionModelChange={(newSelectionModel: any) =>
          //   setSelectionModel(newSelectionModel)
          // }
          onCellClick={handleCellClick}
        />
      </div>
    </Layout>
  );
};

export default Table;
