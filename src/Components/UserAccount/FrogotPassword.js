import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
const btnStyle = {
  marginTop: "20px",
  height: "46px",
  padding: "8px",
  borderRadius: "25px",
  background: "#3765ec",
};

const validationSchema = yup.object({
  email: yup
    .string("Enter your email.")
    .email("Enter a valid email.")
    .required("Email is required."),
});

const ForgetPassword = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //console.log(values.email);
      let username = values.email;
      fetch(
        `https://ms.stagingsdei.com:4011/password/reset?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          //console.log("ttt", response);
        })
        .catch((error) => {
          //console.log(error);
        });

      // axios
      //   .get(
      //     `https://ms.stagingsdei.com:4011/password/reset?username=${userName}`
      //   )
      //   .then((response) => {
      //     console.log(response);
      //     //console.log(response.status);
      //     //console.log(response.statusText);
      //     //  console.log("this is res object", response.status);
      //   })
      //   .catch((error) => {
      //     //console.log(error);
      //   });
    },
  });

  const handleBack = () => {
    navigate("/login");
  };

  return (
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
                  <Typography variant="h5" my={2}>
                    Forgot your password
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={btnStyle}
                >
                  Send email
                </Button>
              </form>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleBack}
                style={btnStyle}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
        <div className="right-col column-blc">
          <div className="img-block">
            <img src={require("../../Asset/img/login-pic.png")} alt="Login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
