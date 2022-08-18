import React, { useState } from "react";
import { Button, TextField, Typography, Link, InputLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Constant/Spinner";

const axios = require("axios").default;

const btnStyle = {
  marginTop: "10px",
  height: "40px",
  padding: "8px",
  borderRadius: "25px",
  background: "#3765ec",
};

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your first Name.")
    .min(5, "First Name should be of minimum 5 characters length.")
    .max(100, "Maximum has value reached.")
    .matches("^[a-zA-Z_]", "Firstname is required.")
    .required("First Name is required."),

  lastname: yup
    .string("Enter your last Name.")
    .min(3, "Last Name should be of minimum 3 characters length.")
    .max(100, "Maximum has value reached.")
    .required("Last Name is required.")
    .matches("^[0-9a-zA-Z_]", "Lastname is required."),

  username: yup
    .string("Enter your Username.")
    .max(100, "Maximum has value reached.")
    .required("User Name is required.")
    .matches("^[0-9a-zA-Z_]", "User Name is required."),

  companyname: yup
    .string("Enter your company Name.")
    .max(100, "Maximum has value reached.")
    .required("Company Name is required.")
    .matches("^[0-9a-zA-Z_]", "Company Name is required."),

  rooms: yup
    .string("")
    .required("Number of rooms is required.")
    .matches("^[0-9]", "Number of rooms is required."),

  email: yup
    .string("Enter your email.")
    .email("Enter a valid email.")
    .required("Email is required."),

  password: yup
    .string("Enter your password.")
    .matches(
      "^(?=.*[A-Z]|[a-z]|[0-9])(?=.*?[0-9])(?=.*[@$!%*#?&])[A-Za-zd0-9@$!%*#?&].{8,15}$",
      "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
    )
    .max(15, "Password should not to be more than 15 characters length.")
    .required("Password is required."),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [isActive, seisActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      companyname: "",
      rooms: "",
      email: "",
      password: "",
      // acceptTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      seisActive(true);
      axios
        .post("https://ms.stagingsdei.com:4011/signup", {
          companyName: values.companyname,
          rooms: values.rooms,
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          userName: values.username,
          password: values.password,
          // acceptTerms: values.acceptTerms,
        })
        .then((response) => {
          navigate("/login");
          //console.log("response", response);
        })

        .catch((error) => {
          //console.log(error);
        });

      alert(
        "Successful! Please Check your mail and activate your account to login"
      );
    },
  });

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <>
      {isActive ? (
        <Spinner />
      ) : (
        <>
          <div className="signup-wrapper">
            <div className="left-col column-blc">
              <div className="inner">
                <div className="logo-block">
                  <img src={require("../../Asset/img/logo.png")} alt="Logo" />
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <Typography variant="h6" component={InputLabel}>
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="firstname"
                    placeholder="First Name"
                    size="small"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstname &&
                      Boolean(formik.errors.firstname)
                    }
                    helperText={
                      formik.touched.firstname && formik.errors.firstname
                    }
                  />
                  <Typography variant="h6" component={InputLabel}>
                    Last Name
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder="Last Name"
                    id="lastname"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastname && Boolean(formik.errors.lastname)
                    }
                    helperText={
                      formik.touched.lastname && formik.errors.lastname
                    }
                  />
                  <Typography variant="h6" component={InputLabel}>
                    Company Name
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    id="companyname"
                    placeholder="Company Name"
                    name="companyname"
                    value={formik.values.companyname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.companyname &&
                      Boolean(formik.errors.companyname)
                    }
                    helperText={
                      formik.touched.companyname && formik.errors.companyname
                    }
                  />
                  <Typography variant="h6" component={InputLabel}>
                    User Name
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder="User Name"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <Typography variant="h6" component={InputLabel}>
                    Number of rooms
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    id="rooms"
                    type="number"
                    name="rooms"
                    placeholder="Number of rooms"
                    value={formik.values.rooms}
                    onChange={formik.handleChange}
                    error={formik.touched.rooms && Boolean(formik.errors.rooms)}
                    helperText={formik.touched.rooms && formik.errors.rooms}
                  />
                  <Typography variant="h6" component={InputLabel}>
                    Email
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <Typography variant="h6" component={InputLabel}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id="password"
                    name="password"
                    variant="outlined"
                    placeholder="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Box sx={{ display: "flex" }} my={1}>
                    {/* <Field type="checkbox" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                  <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" /> */}

                    <Checkbox
                      // size="small"
                      // type="checkbox"
                      // name="acceptTerms"
                      // id="acceptTerms"
                      // value={formik.values.acceptTerms}
                      // onChange={formik.handleChange}
                      // error={
                      //   formik.touched.acceptTerms && Boolean(formik.errors.acceptTerms)
                      // }
                      // helperText={
                      //   formik.touched.acceptTerms && formik.errors.acceptTerms
                      // }
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography
                      padding={0}
                      variant="h6"
                      letterSpacing={0}
                      sx={{ flex: 1 }}
                      className="term-txt"
                    >
                      I understand and agree to &nbsp;
                      <Link href="#" underline="always">
                        Terms of service,
                      </Link>
                      &nbsp; including the &nbsp;
                      <Link href="#" underline="always">
                        User Agreement
                      </Link>
                      &nbsp; and
                      <Link marginLeft={1} href="#" underline="always">
                        Privacy Policy.
                      </Link>
                    </Typography>
                  </Box>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={btnStyle}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={handleBack}
                    style={btnStyle}
                  >
                    Back
                  </Button>
                </form>
              </div>
            </div>
            <div className="right-col column-blc">
              <div className="img-block">
                <img
                  src={require("../../Asset/img/login-pic.png")}
                  alt="Login"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignUp;
