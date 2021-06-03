import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
/* import axios from "axios"; */
import authActions from "../redux/actions/authActions";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const SignIn = (props) => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const formik = useFormik({
    initialValues: {
      adminGral: true,
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      /*    props.logInUser(values); */
    },
  });

  return (
    <div className="contenedorSignUp">
      <video src="./assets/formVideo.mp4" autoPlay loop muted className="videoForm"></video>
      {/* <div className="contenedorHeaderSignUp"> */}
        <Link to="/" className="backToHome"><span class="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</Link>
      {/* </div> */}
      <div className="contenedorFormAdmin">
        <div className="contenedorInfoFormAdmin">
          <h3>Main Administrator Log In</h3>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="link" variant="contained" fullWidth type="submit">Log In</Button>
          </form>

          {/* secreto google esu21qkgDbOgSQKwu8JWeBFb */}
        </div>

      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  logInUser: authActions.logInUser,
};
export default connect(null, mapDispatchToProps)(SignIn);
/* export default SignIn; */
