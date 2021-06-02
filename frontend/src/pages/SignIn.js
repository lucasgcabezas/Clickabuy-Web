import React from "react";
import ReactDOM from "react-dom";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
/* Formik, Form, Field, ErrorMessage */
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
/* import axios from "axios"; */
import authActions from "../redux/actions/authActions";
import GoogleLogin from "react-google-login";
import { NavLink } from "react-router-dom";
/* import ProgressStepBar from "../components/ProgressStepBar"; */
// import "react-step-progress-bar/styles.css";
// import { ProgressBar, Step } from "react-step-progress-bar";

const validationSchema = yup.object({
  email: yup
    .string("Enter a valid email address")
    .trim()
    .email("Enter a valid email")
    .required("This field is mandatory"),

  password: yup
    .string("Enter your password")
    .min(6, "Your password must be at least 6 characters long")
    .trim()
    .required("Password is required")
    .matches(
      /(?=.*\d)(?=.*[A-z])/,
      "Your password must be at least 6 characters long, contain a capital letter, minuscule letter and number"
    ),

  /* password:joi.string().min(6).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/).messages({
      "string.empty":"This field is mandatory",
      "string.pattern.base": "Your password must be at least 6 characters long, contain a capital letter, minuscule letter and number",
      "string.min": "Your password must be at least 6 characters long" */
});

const SignIn = (props) => {
  const [pbStatus, setPBStatus] = useState(25);

  const respuestaGoogle = (response) => {
    const { givenName, familyName, email, googleId, imageUrl } = response.profileObj;
    /* setPreUser({name:givenName,email:email,pass:googleId,url:imageUrl}) */
    /*   console.log(response); */
    /*  alert("ahora"); */
    console.log({
      email: email,
      password: "a" + googleId,
    });
    props.logInUser({
      email: email,
      password: "a" + googleId,
    });
    props.history.push("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      /*  alert(JSON.stringify(values, null, 2)); */
      props.logInUser(values);
      props.history.push("/");
    },
  });

  return (
    <div>
      <div className="w-50 mt-5 mx-auto">
        <label className="h3 ml-0">Complete your Personal Data</label>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
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
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
        <GoogleLogin
          className="mt-1 w-100 text-center text-white bg-primary"
          clientId="453615867535-mmnqpnp68m7du525dnif9647ll1bssi5.apps.googleusercontent.com"
          buttonText="LogIn with Google"
          onSuccess={respuestaGoogle}
          onFailure={respuestaGoogle}
          cookiePolicy={"single_host_origin"}
        />
        {/* secreto google esu21qkgDbOgSQKwu8JWeBFb */}
        <NavLink to="/SignUp">
          <label className="mt-2 w-100 btn  h6">
            Don't have an account?, <span className="text-primary">Sign Up Here</span>{" "}
          </label>{" "}
        </NavLink>

        <NavLink to="/SignInAdmin">
          <label className="mt-2 w-100 btn  h6">shortcut admin login </label>
        </NavLink>
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
