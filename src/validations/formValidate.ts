import { ValidationErrors } from "../types/deptAdminType";

export const validateForm = (formData: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.firstname) {
    errors.firstname = "First name is required";
  }

  if (!formData.lastname) {
    errors.lastname = "Last name is required";
  }

  if (!formData.middlename) {
    errors.middlename = "Middle name is required";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.loginsso && !formData.password) {
    errors.password = "Password is required";
  }

  if (!formData.loginsso && formData.password !== formData.repeatPassword) {
    errors.repeatPassword = "Passwords do not match";
  }

  return errors;
};
