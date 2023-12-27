import React, { FormEvent, useEffect } from "react";
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
} from "@mui/material";
import { useParams } from "react-router-dom";
import * as api from "../services/apiServices";
import { Errors } from "../types/deptAdminType";
import { FormData } from "../types/deptAdminType";
import Layout from "./layouts/Layout";

const Add = () => {
  const { selectedId } = useParams();
  const [formData, setFormData] = React.useState<FormData>({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    loginsso: false,
    password: "",
    repeatPassword: "",
    instructor: false,
    _id: selectedId,
  });

  const [errors, setErrors] = React.useState<Errors>({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstname.trim()) {
      errors.firstname = "First Name is required";
    }

    if (!formData.middlename.trim()) {
      errors.middlename = "Middle Name is required";
    }

    if (!formData.lastname.trim()) {
      errors.lastname = "Last Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.loginsso) {
      if (!formData.password.trim()) {
        errors.password = "New Password is required";
      }
      if (!formData.repeatPassword.trim()) {
        errors.repeatPassword = "Repeat Password is required";
      } else if (formData.password !== formData.repeatPassword) {
        errors.repeatPassword = "Passwords do not match";
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const fetchData = async (selectedId) => {
      try {
        const result = await api.showIdData(selectedId);
        setFormData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(selectedId);
  }, [selectedId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;

    console.log(formData);
    if (validateForm()) {
      try {
        const result = await api.updateData(formDataWithoutRepeatPassword);
        console.log("Data Updated", result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" mb={3}>
          Depart Admin Add Form
        </Typography>

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
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.username)}
                helperText={errors.userame}
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
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
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
