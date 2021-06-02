import React from "react";
import ReactDOM from "react-dom";
import { useFormik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import authActions from "../redux/actions/authActions";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { NavLink } from "react-router-dom";
import "../gracia.css";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter a valid name")
    .required("Name is required")
    .min(2, "Your name must contain at least 2 letters")
    .max(20, "Your name can’t contain more than 20 letters.")
    .trim()
    .required("This field is mandatory")
    .matches(new RegExp("[a-zA-Z]$"), "This field can only contain letters"),

  lastName: yup
    .string("Enter a valid last name")
    .required("Name is required")
    .trim()
    .min(3, "Your last name must contain at least 3 letters")
    .max(20, "Your last name cannot contain more than 20 letters")
    .matches(new RegExp("[a-zA-Z]$"), "This field can only contain letters"),

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
});

const SignUp = (props) => {
  const [photo, setPhoto] = useState({ userImg: "" });
  const respuestaGoogle = (response) => {
    const { givenName, familyName, email, googleId, imageUrl } = response.profileObj;
    /* setPreUser({name:givenName,email:email,pass:googleId,url:imageUrl}) */
    /*  console.log(response); */
    /* alert("ahora"); */
    console.log({
      loggedWithGoogle: true,
      firstName: givenName,
      lastName: familyName,
      userImg: imageUrl,
      /*   adminGral: false, */
      email: email,
      password: "a" + googleId,
    });

    let formData = new FormData();
    formData.append("loggedWithGoogle", true);
    formData.append("firstName", givenName);
    formData.append("lastName", familyName);
    // formData.append("adminGral", false);
    formData.append("email", email);
    formData.append("password", "a" + googleId);
    formData.append("userImg", imageUrl);
    props.signUpUser(formData);
    props.history.push("/");
  };

  const formik = useFormik({
    initialValues: {
      loggedWithGoogle: false,
      firstName: "",
      lastName: "",
      userImg: "",
      /*   adminGral: false, */
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      /*   alert("entrando"); */
      let formData = new FormData();
      formData.append("loggedWithGoogle", values.loggedWithGoogle);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      /*   formData.append("adminGral", false); */
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("userImg", photo.userImg);
      /*   console.log("x", formData); */

      /*  alert(JSON.stringify(values, null, 2));
      console.log("el formData", formData); */
      props.signUpUser(formData);
      props.history.push("/");
    },
  });

  const cargarFoto = (e) => {
    setPhoto({ userImg: e.target.files[0] });
  };

  return (
    <div>
      <div className="w-50 mt-5 mx-auto">
        <label className="h3 ml-0">Complete your Personal Data</label>
        <NavLink to="/SignUpStore">
          <div className="d-flex  justify-content-end">
            <label className="btn text-primary">create a Business account {">"} </label>
          </div>{" "}
        </NavLink>
        <form id="myForm" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="Your Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

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
<label htmlFor="userImg" className="btn btn-secondary">
  Choose Your Image
          <input id="userImg" name="userImg"  type="file" style={{display:"none"}}  onChange={cargarFoto} />
          </label>

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>

        <GoogleLogin
          className="mt-1 w-100 text-center text-white bg-primary"
          clientId="453615867535-mmnqpnp68m7du525dnif9647ll1bssi5.apps.googleusercontent.com"
          buttonText="Sign Up with Google"
          onSuccess={respuestaGoogle}
          onFailure={respuestaGoogle}
          cookiePolicy={"single_host_origin"}
        />
        {/* secreto google esu21qkgDbOgSQKwu8JWeBFb */}
        <NavLink to="/SignIn">
          <label className="mt-2 w-100 btn  h6">
            Do you have an account?, <span className="text-primary">LogIn Here</span>{" "}
          </label>{" "}
        </NavLink>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  signUpUser: authActions.signUpUser,
};
export default connect(null, mapDispatchToProps)(SignUp);
/* export default SignUp; */
