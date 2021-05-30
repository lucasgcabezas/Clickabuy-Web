import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
  CID: yup.string("company identification number (CID)").required("CID is Required"),
  bName: yup.string("Enter business name").required("Business Name is required"),
  /*  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"), */
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const SignUpStore = () => {
  const [photo, setPhoto] = useState({ userImg: "" });
  const formik = useFormik({
    initialValues: {
      CID: "",
      ownerName: "",
      bName: "",
      storeLogo: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      /*   alert(JSON.stringify(values, null, 2)); */
      let formData = new FormData();
      formData.append("CID", values.CID);
      formData.append("ownerName", values.ownerName);
      formData.append("bName", values.bName);
      formData.append("storeLogo", values.storeLogo);
      formData.append("password", values.password);
      formData.append("userImg", photo.userImg);
      /*  console.log("x", formData); */
      /*  props.signUpStore(formData); */
    },
  });

  const cargarFoto = (e) => {
    setPhoto({ userImg: e.target.files[0] });
  };

  return (
    <div>
      <div className="w-50 mt-5 mx-auto">
        <label className="h3 ml-0">Complete your Business Data</label>
        <NavLink to="/SignUp">
          <div className="d-flex  justify-content-end">
            <label className="btn text-primary">create a person account {">"} </label>
          </div>{" "}
        </NavLink>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="CID"
            name="CID"
            label="company identification number (CID)"
            value={formik.values.CID}
            onChange={formik.handleChange}
            error={formik.touched.CID && Boolean(formik.errors.CID)}
            helperText={formik.touched.CID && formik.errors.CID}
          />

          <TextField
            fullWidth
            id="ownerName"
            name="ownerName"
            label="Name or ID of the owner or legal representative"
            value={formik.values.ownerName}
            onChange={formik.handleChange}
            error={formik.touched.ownerName && Boolean(formik.errors.ownerName)}
            helperText={formik.touched.ownerName && formik.errors.ownerName}
          />

          <TextField
            fullWidth
            id="bName"
            name="bName"
            label="business name"
            value={formik.values.bName}
            onChange={formik.handleChange}
            error={formik.touched.bName && Boolean(formik.errors.bName)}
            helperText={formik.touched.bName && formik.errors.bName}
          />

          <input id="userImg" name="userImg" type="file" onChange={cargarFoto} />
          {/*     <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          /> */}
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="secondary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
export default SignUpStore;
