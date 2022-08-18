import React, { useState } from "react";
import { Button, TextField, Typography, Link, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Spinner from "../../Constant/Spinner";
const axios = require("axios").default;
const btnStyle = {
  marginTop: "10px",
  height: "40px",
  padding: "8px",
  borderRadius: "25px",
  background: "#3765ec",
};

const validationSchema = yup.object().shape({
  username: yup
    .string("Enter your username.")
    .required("Username is required.")
    .matches("^[0-9a-zA-Z_]", "Username is required."),
  password: yup
    .string("Enter your password.")
    .required("Password is required.")
    .min(8, "Minimum 8 character required.")
    .max(15, "Maximum 15 character only."),
});

const LogIn = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      setActive(true);
      //console.log(values.username);
      axios
        .post("https://ms.stagingsdei.com:4011/signin", {
          userName: values.username,
          password: values.password,
        })
        .then((response) => {
          //console.log(response.data.data.result);
          if (
            response.data.data &&
            response.data.data.result &&
            response.data.data.result.userID
          ) {
            localStorage.setItem("ID", response.data.data.result.userID);
            navigate("/dashboard");
            setActive(false);
          } else {
            //console.log("invalid credentials");
          }
          //  console.log("this is res object", response.status);
        })
        .catch((error) => {
          //console.log(error);
        });
    },
  });
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
                <div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-block">
                      <Typography variant="h6" component={InputLabel}>
                        Username
                      </Typography>
                      <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        id="username"
                        placeholder="Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                      />
                    </div>
                    <div className="form-block">
                      <Typography variant="h6" component={InputLabel}>
                        Password
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        id="password"
                        name="password"
                        variant="outlined"
                        placeholder="*********"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                      <div className="forgot-link">
                        <Typography marginRight={3} textAlign="right">
                          <Link href="forgot-password" underline="none">
                            Forgot password?
                          </Link>
                        </Typography>
                      </div>
                    </div>

                    <Button
                      disableElevation
                      disableRipple
                      disableFocusRipple
                      type="submit"
                      variant="contained"
                      fullWidth
                      style={btnStyle}
                    >
                      Sign In
                    </Button>
                    <Typography my={2} textAlign="center">
                      New here?
                      <Link href="create-account" underline="none">
                        &nbsp; Create Account
                      </Link>
                    </Typography>
                  </form>
                </div>
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

export default LogIn;
