import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <TextField
        id="login"
        label="Login"
        variant="outlined"
        fullWidth
        margin="normal"
        value={token || ""} // Set the value of the TextField
        onChange={handleChange} // Handle changes in the TextField
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default Login;
