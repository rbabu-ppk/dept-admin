import React, { FormEvent, useContext, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../services/apiServices";
import { Errors } from "../../types/deptAdminType";
import { FormData } from "../../types/deptAdminType";
import Layout from "../layouts/Layout";
import MyContext from "../../context/context";
import { validateForm } from "../../validations/formValidate";

const Add = () => {
  const { selectedId } = useParams();
  const [formData, setFormData] = React.useState<FormData>({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    loginsso: false,
    username: "",
    password: "",
    repeatPassword: "",
    instructor: false,
    _id: selectedId,
  });

  const [errors, setErrors] = React.useState<Errors>({});
  const navigate = useNavigate();
  const { token } = useContext(MyContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchData = async (selectedId, token) => {
      try {
        const result = await api.showIdData(selectedId, token);
        setFormData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(selectedId, token);
  }, [selectedId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;

      try {
        const result = await api.updateData(
          formDataWithoutRepeatPassword,
          token
        );
        navigate("/table");
        console.log("Data Updated", result);
      } catch (error) {
        console.log(error);
      }
    } else {
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
          Depart Admin Edit Form
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
                User Name
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
                  // value={formData.password}
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
                  // value={formData.repeatPassword}
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
          <Grid item xs={12} sm={1}>
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
