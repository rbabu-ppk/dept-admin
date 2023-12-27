export const validateForm = () => {
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
