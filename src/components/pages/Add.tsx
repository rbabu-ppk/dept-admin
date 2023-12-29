import React, { FormEvent, useContext } from "react";
import {
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Button,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import * as api from "../../services/apiServices";
import { AddFormData, Errors } from "../../types/deptAdminType";
import Layout from "../layouts/Layout";
import MyContext from "../../context/context";
import { useNavigate } from "react-router-dom";

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

  const [errors, setErrors] = React.useState<Errors>({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    // loginsso: "",
    password: "",
    repeatPassword: "",
    // instructor: "",
  });

  const [isFormValid, setIsFormValid] = React.useState(false);

  const { token } = useContext(MyContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors: Errors = {
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
    };
    if (formData.firstname.trim() === "") {
      newErrors.firstname = "First name is required";
      isValid = false;
    }
    if (formData.lastname.trim() === "") {
      newErrors.lastname = "Last name is required";
      isValid = false;
    }
    if (formData.middlename.trim() === "") {
      newErrors.middlename = "Middle name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Password mismatch";
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateForm();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;
    try {
      const result = await api.createData(formDataWithoutRepeatPassword, token);
      console.log("Data Created", result);
      navigate("/table");
    } catch (error) {
      console.log(error);
    }
  };

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
                label="First Name"
                size="small"
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
                label="Middle Name"
                size="small"
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
                id="lastname"
                size="small"
                label="Last Name"
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
                label="Email"
                size="small"
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
                      size="small"
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
                    size="small"
                    label="New Password"
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
                    size="small"
                    id="repeatPassword"
                    label="Repeat Password"
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
              {/* <Typography variant="body2" mb={1}>
                Is Instructor
              </Typography> */}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="isInstructor"
                      name="instructor"
                      size="small"
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
                disabled={!isFormValid}
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
