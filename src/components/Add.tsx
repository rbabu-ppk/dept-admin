import React, { FormEvent, useContext } from "react";
import {
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Button,
  Box,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import * as api from "../services/apiServices";
import { AddFormData, Errors } from "../types/deptAdminType";
import Layout from "../components/layouts/Layout";
import MyContext from "../context/context";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../validations/formValidate";

const Add = () => {
  const [formData, setFormData] = React.useState<AddFormData>({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    loginsso: false,
    password: "",
    repeatPassword: "",
    instructor: false,
  });

  const [errors, setErrors] = React.useState<Errors>({});
  const { token } = useContext(MyContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;
      try {
        const result = await api.createData(
          formDataWithoutRepeatPassword,
          token
        );
        console.log("Data Created", result);
        navigate("/table");
      } catch (error) {
        console.log(error);
      }
    } else {
      // Update state with validation errors
      setErrors(errors);
    }
  };
  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" mb={3}>
          Depart Admin Add Form
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Typography variant="body2" mb={1}>
                First Name
              </Typography>
              <TextField
                id="firstName"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.firstname)}
                helperText={errors.firstname}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Typography variant="body2" mb={1}>
                Middle Name
              </Typography>
              <TextField
                id="middleName"
                name="middlename"
                value={formData.middlename}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.middlename)}
                helperText={errors.middlename}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Typography variant="body2" mb={1}>
                Last Name
              </Typography>
              <TextField
                id="middleName"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.lastname)}
                helperText={errors.lastname}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography variant="body2" mb={1}>
                Email
              </Typography>
              <TextField
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Typography variant="body2" mb={1}>
                Login Using SSO
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="loginsso"
                      name="loginsso"
                      checked={formData.loginsso}
                      onChange={handleChange}
                    />
                  }
                  label="Enable SSO"
                />
              </FormGroup>
            </FormControl>
          </Grid>

          {!formData.loginsso && (
            <>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography variant="body2" mb={1}>
                    New Password
                  </Typography>
                  <TextField
                    type="password"
                    id="newPassword"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography variant="body2" mb={1}>
                    Repeat Password
                  </Typography>
                  <TextField
                    type="password"
                    id="repeatPassword"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(errors.repeatPassword)}
                    helperText={errors.repeatPassword}
                  />
                </FormControl>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography variant="body2" mb={1}>
                Is Instructor
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="isInstructor"
                      name="instructor"
                      checked={formData.instructor}
                      onChange={handleChange}
                    />
                  }
                  label="Yes, I am an instructor"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitDisabled}
              >
                Submit
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default Add;
