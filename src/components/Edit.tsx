import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import axios from 'axios';

const Add = () => {
  const [datas, setDatas] = useState([]);
  const [formData, setFormData] = React.useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    loginsso: false,
    password: '',
    repeatPassword: '',
    instructor: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  
console.log(datas);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dev-admin.sunrises.io/api/get-departadmin-withid?_id=${id}`, {headers:{
          // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU4YTZmOTNhMGI4OTk2Y2ZiMTIxYTAwIiwidXVpZCI6IjQzNzUyYmZhLWQ5NjItNGRiZS04Mzk5LWMxYmM2MTRhOWFiMyIsInBhc3N3b3JkX2V4cGlyZWQiOmZhbHNlLCJpYXQiOjE3MDM2MDgyODYsImV4cCI6MTcwMzYxODI4Nn0.OUcRjvUO6UgwJldgiEuYnG5fglxsUHKLUtldsnUOAkg',
        }});
        const formattedData = Object.values(response.data).map((obj) => ({
          id: obj._id,
          ...obj,
        }));
        setDatas(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);


    try {
      const response = await axios.post('https://dev-admin.sunrises.io/api/create-departadmin', formData, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU4YTZmOTNhMGI4OTk2Y2ZiMTIxYTAwIiwidXVpZCI6IjQzNzUyYmZhLWQ5NjItNGRiZS04Mzk5LWMxYmM2MTRhOWFiMyIsInBhc3N3b3JkX2V4cGlyZWQiOmZhbHNlLCJpYXQiOjE3MDM2MDgyODYsImV4cCI6MTcwMzYxODI4Nn0.OUcRjvUO6UgwJldgiEuYnG5fglxsUHKLUtldsnUOAkg"
        },
      });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" align="center" mb={3}>
        Depart Admin Edit Form
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
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth mb={2}>
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
        />
      </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
      <FormControl fullWidth mb={2}>
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
          <FormControl fullWidth mb={2}>
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
            />
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth mb={2}>
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
            />
          </FormControl>
          </Grid>
        </>
      )}
 <Grid item xs={12} sm={6}>
      <FormControl fullWidth mb={2}>
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
        <Grid item xs={12}>
          <FormControl fullWidth mb={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default Add;
