import React, { ChangeEvent, FormEvent, useContext, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../services/apiServices";
import { EditErrors, Errors, UpdateFormData } from "../../types/deptAdminType";
import Layout from "../layouts/Layout";
import MyContext from "../../context/context";

const Add = () => {
  const { selectedId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<UpdateFormData>({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    loginsso: false,
    username: "",
    password: "",
    repeatPassword: "",
    instructor: false,
    _id: "",
  });

  const [errors, setErrors] = React.useState<EditErrors>({
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    validateForm();
  };

  useEffect(() => {
    if (selectedId === undefined) {
      return;
    }
    const fetchData = async (selectedId: string, token: string | null) => {
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

    const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;

    try {
      const result = await api.updateData(formDataWithoutRepeatPassword, token);
      navigate("/table");
      console.log("Data Updated", result);
    } catch (error) {
      console.log(error);
    }
  };

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
                size="small"
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
                size="small"
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
                size="small"
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
                size="small"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.username)}
                helperText={errors.username}
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
                size="small"
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
                  size="small"
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
                  size="small"
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
          <Grid item xs={12} sm={1}>
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
