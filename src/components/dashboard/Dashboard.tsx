import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Layout from "../layouts/Layout";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useContext, useEffect } from "react";
import * as api from "../../services/apiServices";
import MyContext from "../../context/context";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

const Dashboard = () => {
  const { token } = useContext(MyContext);
  const [data, setData] = React.useState([]);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.showDashboard(token);
        // console.log(response);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Layout>
        <Typography variant="h5" align="center" mb={3}>
          Dashboard
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={4}>
              <Paper
                elevation={3}
                style={{ padding: "10px 300px 10px 10px", margin: "10px" }}
              >
                <CardContent style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    component={RouterLink}
                    to={item.redirectLink}
                    color="primary"
                  >
                    <HomeIcon />
                  </IconButton>
                  <div>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary">{item.count}</Typography>
                  </div>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Layout>
    </div>
  );
};

export default Dashboard;
