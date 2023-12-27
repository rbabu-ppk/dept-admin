import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Layout from "../layouts/Layout";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const Dashboard = () => {
  return (
    <div>
      <Layout>
        <Typography variant="h5" align="center" mb={3}>
          Dashboard
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
              <CardContent style={{ display: "flex", alignItems: "center" }}>
                <Button>
                  <Diversity3Icon style={{ marginRight: "10px" }} />
                </Button>
                <div>
                  <Typography variant="h5" component="div">
                    Trainees
                  </Typography>
                  <Typography color="text.secondary">0</Typography>
                </div>
              </CardContent>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
              <CardContent style={{ display: "flex", alignItems: "center" }}>
                <Button>
                  <ShoppingCartIcon style={{ marginRight: "10px" }} />
                </Button>
                <div>
                  <Typography variant="h5" component="div">
                    Simulations
                  </Typography>
                  <Typography color="text.secondary">0</Typography>
                </div>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

export default Dashboard;
