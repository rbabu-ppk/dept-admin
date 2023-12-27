import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Layout from "../layouts/Layout";

const Dashboard = () => {
  return (
    <div>
      <Layout>
        <Paper>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
                {/* First Card */}
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Card 1
                    </Typography>
                    <Typography color="text.secondary">
                      This is the content of the first card.
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
                {/* Second Card */}
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Card 2
                    </Typography>
                    <Typography color="text.secondary">
                      This is the content of the second card.
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Layout>
    </div>
  );
};

export default Dashboard;
