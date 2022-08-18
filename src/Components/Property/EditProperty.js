import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  InputLabel,
  Stack,
  Container,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useFormik } from "formik";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Applogo from "../../Asset/img/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DashboardLeftSidebar from "../Dashboard/DashboardLeftSidebar";
import * as yup from "yup";
const axios = require("axios").default;
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const btnStyle = {
  marginTop: "20px",
  height: "46px",
  padding: "8px",
  borderRadius: "25px",
  background: "#3765ec",
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const validationSchema = yup.object({
  propertyName: yup
    .string()
    .min(5, "Property name must have minimum 5 characters")
    .max(100, "Maximum has value reached.")
    .matches("^[a-zA-Z_]", "propertyName is required.")
    .required("Property name is required."),

  propertyaddressOne: yup
    .string()
    .min(5, "Property address 1  must have minimum 5 characters")
    .max(100, "Maximum has value reached.")
    .required("Property address 1 is required.")
    .matches("^[0-9a-zA-Z_]", "Property address 1 is required."),

  postalCode: yup
    .string()
    .max(100, "Maximum has value reached.")
    .required("Postal code is required."),

  propertyaddressTwo: yup
    .string()
    .max(100, "Maximum has value reached.")
    .required("Property address 2 is required.")
    .matches("^[0-9a-zA-Z_]", "Property address 2 is required."),

  City: yup.string().required("City is required."),
  sstate: yup.string().required("State is required."),
  country: yup.string().required("Country is required."),
  company: yup.string().required("Company name is required."),
  bic: yup.string().required("Bic is required."),
  bank: yup.string().required("Bank is required."),
  iban: yup.string().required("Iban is required."),
  taxid: yup.string().required("Tax id is required."),
  md: yup.string().required("Managing Director is required."),
  checkin: yup.string().nullable().required("Check in is required."),

  checkout: yup.string().nullable().required("Check out is required."),
});

export default function EditProperty() {
  const { id } = useParams();
  const { state } = useLocation();
  const { rowa } = state;
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [item, setItem] = useState({});
  useEffect(() => {
    const callApi = async () => {
      const response = await fetch(
        "https://ms.stagingsdei.com:4011/property/list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      setList(res.data.result);
    };
    callApi();
  }, []);
  useEffect(() => {
    let i =
      list && list.length > 0 && list.filter((keyItem) => keyItem.id == id);
    setItem(i && i[0]);
  }, [item]);
  console.log(item, "===");
  const [value, setValue] = React.useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const formik = useFormik({
    initialValues: {
      propertyName: rowa.propertyName,
      propertyaddressOne: rowa.address1,
      postalCode: rowa ? rowa.postalCode : "",
      propertyaddressTwo: rowa ? rowa.address1 : "",
      City: rowa ? rowa.city : "",
      sstate: rowa ? rowa.state : "",
      company: rowa ? rowa.company : "",
      bic: rowa ? rowa.bic : "",
      bank: rowa ? rowa.bank : "",
      iban: rowa ? rowa.iban : "",
      taxid: rowa ? rowa.taxid : "",
      checkin: rowa ? rowa.checkIn : "",
      checkout: rowa ? rowa.checkOut : "",

      md: "",
      country: rowa ? rowa.country : "",

      // acceptTerms: false,
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      //  console.log("hello");
      // console.log(values.propertyName);
      // console.log(values.propertyaddressOne);
      //console.log(values.propertyaddressOne);

      axios
        .post("https://ms.stagingsdei.com:4011/property/update", {
          property: {
            code: "1",
            id: rowa.id,
            propertyName: values.propertyName,
            address1: values.propertyaddressOne,
            address2: values.propertyaddressTwo,
            postalCode: values.postalCode,
            city: values.City,
            country: values.country,
            currencyCode: "",
            phone: "",
            email: "",
            checkIn: values.checkin,
            checkOut: values.checkout,
          },
          propertyDetail: [
            {
              name: values.propertyName,
              description: "",
            },
          ],
          company: {
            companyName: values.company,
            bank: values.bank,
            bic: values.bic,
            iban: values.iban,
            commercialRegisterEntry: "",
            taxId: values.taxid,
            managingDirector: values.md,
            phone: "",
            email: "",
          },
          companyTerms: [
            {
              language: "",
              paymentTerms: "",
            },
          ],
        })
        .then((response) => {
          navigate("/propertylist");
          console.log("response", response);
        })
        .catch((err) => {
          console.log(err);
        });
      alert("Changes saved successfuly");
    },
  });

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="dashboard-wrapper d-flex flex-column flex-fill overflow-auto">
        <header className="dashboard-header d-flex align-items-center">
          <div className="left-col">
            <Avatar src={Applogo} alt="Logo" className="test" />
          </div>
          <div className="right-col ms-auto">
            <div className="user-profile-cell d-inline-flex align-items-center">
              <span>Developer_22</span>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={logOut}
              >
                <LogoutIcon />
              </IconButton>
            </div>
          </div>
        </header>
        <div className="inner-wrapper d-flex flex-fill overflow-auto">
          <div className="left-col d-flex flex-column flex-fill overflow-auto">
            <DashboardLeftSidebar />
          </div>
          <div className="right-col d-flex flex-column flex-fill overflow-auto">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-container">
                <div className="card-block">
                  <div className="card-title">Property Details</div>
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel} py={1}>
                          Property Name
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          id="propertyName"
                          placeholder="Property name"
                          size="small"
                          name="propertyName"
                          value={formik.values.propertyName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.propertyName &&
                            Boolean(formik.errors.propertyName)
                          }
                          helperText={
                            formik.touched.propertyName &&
                            formik.errors.propertyName
                          }
                        />
                      </div>
                    </div>

                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel} py={1}>
                          Property Address 1
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="Property address 1"
                          id="propertyaddressOne"
                          name="propertyaddressOne"
                          value={formik.values.propertyaddressOne}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.propertyaddressOne &&
                            Boolean(formik.errors.propertyaddressOne)
                          }
                          helperText={
                            formik.touched.propertyaddressOne &&
                            formik.errors.propertyaddressOne
                          }
                        />
                      </div>
                    </div>

                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel} py={1}>
                          Property Address 2
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          id="propertyaddressTwo"
                          placeholder="Property address 2"
                          name="propertyaddressTwo"
                          value={formik.values.propertyaddressTwo}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.propertyaddressTwo &&
                            Boolean(formik.errors.propertyaddressTwo)
                          }
                          helperText={
                            formik.touched.propertyaddressTwo &&
                            formik.errors.propertyaddressTwo
                          }
                        />
                      </div>
                    </div>

                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel} py={1}>
                          Postal Code
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          placeholder="Postal code"
                          id="postalCode"
                          name="postalCode"
                          value={formik.values.postalCode}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.postalCode &&
                            Boolean(formik.errors.postalCode)
                          }
                          helperText={
                            formik.touched.postalCode &&
                            formik.errors.postalCode
                          }
                        />
                      </div>
                    </div>

                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel} py={1}>
                          City
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          id="City"
                          name="City"
                          placeholder="City name"
                          value={formik.values.City}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.City && Boolean(formik.errors.City)
                          }
                          helperText={formik.touched.City && formik.errors.City}
                        />
                      </div>
                    </div>

                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel} py={1}>
                          State
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          id="sstate"
                          name="sstate"
                          placeholder="State name"
                          value={formik.values.sstate}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.sstate &&
                            Boolean(formik.errors.sstate)
                          }
                          helperText={
                            formik.touched.sstate && formik.errors.sstate
                          }
                        />
                      </div>
                    </div>

                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel}>
                          Country
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          id="country"
                          name="country"
                          placeholder="Country name"
                          value={formik.values.country}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.country &&
                            Boolean(formik.errors.country)
                          }
                          helperText={
                            formik.touched.country && formik.errors.country
                          }
                        />
                      </div>
                    </div>

                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel} py={1}>
                          Check In
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          id="checkin"
                          name="checkin"
                          type="date"
                          placeholder="Check in date"
                          value={formik.values.checkin}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.checkin &&
                            Boolean(formik.errors.checkin)
                          }
                          helperText={
                            formik.touched.checkin && formik.errors.checkin
                          }
                        />
                      </div>
                    </div>

                    <div className="form-col">
                      <div className="form-block">
                        <Typography variant="h6" component={InputLabel}>
                          Chek Out
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          id="checkout"
                          name="checkout"
                          type="date"
                          placeholder="Check out date"
                          value={formik.values.checkout}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.checkout &&
                            Boolean(formik.errors.checkout)
                          }
                          helperText={
                            formik.touched.checkout && formik.errors.checkout
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-block">
                  <div className="card-title">Company Details</div>

                  <div className="inner-wrapper">
                    <div className="form-row">
                      <div className="form-col">
                        <div className="form-block">
                          <Typography variant="h6" component={InputLabel}>
                            Company
                          </Typography>
                          <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            id="company"
                            name="company"
                            placeholder="Company name"
                            value={formik.values.company}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.company &&
                              Boolean(formik.errors.company)
                            }
                            helperText={
                              formik.touched.company && formik.errors.company
                            }
                          />
                        </div>
                      </div>
                      <div className="form-col">
                        <div className="form-block">
                          <Typography
                            variant="h6"
                            component={InputLabel}
                            py={1}
                          >
                            BIC
                          </Typography>
                          <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            id="bic"
                            name="bic"
                            placeholder="Bic "
                            value={formik.values.bic}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.bic && Boolean(formik.errors.bic)
                            }
                            helperText={formik.touched.bic && formik.errors.bic}
                          />
                        </div>
                      </div>
                      <div className="form-col">
                        <div className="form-block">
                          <Typography
                            variant="h6"
                            component={InputLabel}
                            py={1}
                          >
                            Bank
                          </Typography>
                          <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            id="bank"
                            name="bank"
                            placeholder="Bank"
                            value={formik.values.bank}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.bank && Boolean(formik.errors.bank)
                            }
                            helperText={
                              formik.touched.bank && formik.errors.bank
                            }
                          />
                        </div>
                      </div>
                      <div className="form-col">
                        <div className="form-block">
                          <Typography
                            variant="h6"
                            component={InputLabel}
                            py={1}
                          >
                            IBAN
                          </Typography>
                          <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            id="iban"
                            name="iban"
                            placeholder="Iban"
                            value={formik.values.iban}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.iban && Boolean(formik.errors.iban)
                            }
                            helperText={
                              formik.touched.iban && formik.errors.iban
                            }
                          />
                        </div>
                      </div>
                      <div className="form-col">
                        <div className="form-block">
                          <Typography
                            variant="h6"
                            component={InputLabel}
                            py={1}
                          >
                            Tax ID
                          </Typography>
                          <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            id="taxid"
                            name="taxid"
                            placeholder="Tax id"
                            value={formik.values.taxid}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.taxid &&
                              Boolean(formik.errors.taxid)
                            }
                            helperText={
                              formik.touched.taxid && formik.errors.taxid
                            }
                          />
                        </div>
                      </div>

                      <div className="form-col">
                        <div className="form-block">
                          <Typography
                            variant="h6"
                            component={InputLabel}
                            py={1}
                          >
                            Managing Directors
                          </Typography>
                          <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            id="md"
                            name="md"
                            placeholder=" Managing directors"
                            value={formik.values.md}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.md && Boolean(formik.errors.md)
                            }
                            helperText={formik.touched.md && formik.errors.md}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-btns">
                      <Button color="primary" variant="contained" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
