import React from "react";
import { Button, TextField, Typography, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const btnStyle = {
  marginTop: "20px",
  height: "46px",
  padding: "8px",
  borderRadius: "25px",
  background: "#3765ec",
};
const validationSchema = yup.object({
  password: yup
    .string("Enter your password.")
    .matches(
      "^(?=.*[A-Z]|[a-z]|[0-9])(?=.*?[0-9])(?=.*[@$!%*#?&])[A-Za-zd0-9@$!%*#?&].{8,15}$",
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
    )
    .max(15, "Password should not to be more than 15 characters length.")
    .required("Password is required."),
  cpassword: yup
    .string("Enter your password.")
    .oneOf([yup.ref("password")], "Password not matched")
    .max(15, "Password should not to be more than 15 characters length.")
    .required("Confirm password is required."),
});
const SetnewPassword = () => {
  const navigate = useNavigate();
  const { userid } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("pass", values.password);
      // console.log("capss", values.cpassword);

      axios
        .post("https://ms.stagingsdei.com:4011/setup/newpassword", {
          userId: userid,
          newPassword: values.password,
          confirmPassword: values.cpassword,
        })
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => {
          // console.log(error);
        });

      alert("We have successfuly reset your password, login to continue!");
      navigate("/login");
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
                    Create New Password
                  </Typography>
                  <Typography variant="h6" component={InputLabel}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id="password"
                    name="password"
                    variant="outlined"
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
                </div>
                <div className="form-block">
                  <Typography variant="h6" component={InputLabel}>
                    Confirm password
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id="cpassword"
                    name="cpassword"
                    variant="outlined"
                    type="password"
                    value={formik.values.cpassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.cpassword &&
                      Boolean(formik.errors.cpassword)
                    }
                    helperText={
                      formik.touched.cpassword && formik.errors.cpassword
                    }
                  />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={btnStyle}
                >
                  continue
                </Button>
              </form>
              <Button
                variant="contained"
                fullWidth
                style={btnStyle}
                onClick={handleBack}
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

export default SetnewPassword;
