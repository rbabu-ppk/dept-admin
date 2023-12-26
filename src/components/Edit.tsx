import React from 'react';
import { useFormik } from 'formik';
import {
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Button,
} from '@mui/material';

const Edit: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      loginUsingSSO: false,
      newPassword: '',
      repeatPassword: '',
      isInstructor: false,
    },
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <TextField
          label="First Name"
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Middle Name"
          id="middleName"
          name="middleName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.middleName}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Last Name"
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </FormControl>

      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="loginUsingSSO"
                name="loginUsingSSO"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.loginUsingSSO}
              />
            }
            label="Login Using SSO"
          />
        </FormGroup>
      </FormControl>

      {formik.values.loginUsingSSO === false && (
        <>
          <FormControl>
            <TextField
              label="New Password"
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Repeat Password"
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatPassword}
            />
          </FormControl>
        </>
      )}

      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="isInstructor"
                name="isInstructor"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.isInstructor}
              />
            }
            label="Is Instructor"
          />
        </FormGroup>
      </FormControl>

      <FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default Edit;
