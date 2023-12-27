import React from "react";
import Layout from "../layouts/Layout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The requested page does not exist.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Go to Home
        </Button>
      </Box>
    </Layout>
  );
};

export default PageNotFound;
