import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

const Login: React.FC = ({
  sendToken,
}: {
  sendToken: (token: string) => void;
}) => {
  const [token, setToken] = useState<string | null>(null); // Specify the type of token as string
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendToken(token);
    navigate("/table");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "80vh" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} sm={12} md={8}>
          <TextField
            id="login"
            label="Authorization Token"
            variant="outlined"
            fullWidth
            margin="normal"
            value={token || ""}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
