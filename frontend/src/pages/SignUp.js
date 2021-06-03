import React from "react";
import ReactDOM from "react-dom";
import { useFormik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { FcGoogle } from 'react-icons/fc'
import TextField from "@material-ui/core/TextField";
import authActions from "../redux/actions/authActions";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
// import "../gracia.css";
import { FaTags } from 'react-icons/fa'
import { useEffect, useState } from "react";
import 'boxicons'

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
    console.log({
      loggedWithGoogle: true,
      firstName: givenName,
      lastName: familyName,
      userImg: imageUrl,
      email: email,
      password: "a" + googleId,
    });

    let formData = new FormData();
    formData.append("loggedWithGoogle", true);
    formData.append("firstName", givenName);
    formData.append("lastName", familyName);
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
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("loggedWithGoogle", values.loggedWithGoogle);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("userImg", photo.userImg);
      props.signUpUser(formData);
      props.history.push("/");
    },
  });

  const cargarFoto = (e) => {
    setPhoto({ userImg: e.target.files[0] });
  };

  return (
    <div className="contenedorSignUp">
      <div className="contenedorHeaderSignUp">
        <Link to="/" className="backToHome"><span class="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</Link>
      </div>
      <div className="contenedorInfoForm">
        <div className="contenedorLogoForm">
          <FaTags className="logoForm" />
          {/* <box-icon type='solid' name='purchase-tag' size="lg"></box-icon> */}
          <h1>clickabuy</h1>
          <span>YOU NEEDED, YOU WANTED, WITH CLICKABUY YOU CAN HAVE IT</span>
          <Link to="/SignUpStore" className="bussinesAccount">Create a Business Account <span class="material-icons-outlined iconBussines">arrow_forward_ios</span></Link>
          <div>
            <span className="linkLogInText"> Already have an account?</span><Link to="/SignIn" className="linkLogIn"> Log In</Link>
          </div>
        </div>
        <div className="contenedorForm">
          <h2>Register</h2>

          <form onSubmit={formik.handleSubmit} className="formulario">
            <TextField
              fullWidth
              // className="inputForm"
              id="firstName"
              name="firstName"
              label="Firstname"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Lastname"
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
            {/* <label for="files" class="btn">Select Image</label> */}
            <input id="userImg" name="userImg" type="file" onChange={cargarFoto} className="inputFile"></input>
            {/* <input id="userImg"  type="file" /> */}
            <Button variant="contained" type="submit">
              Sign Up
          </Button>
          </form>
          <div>
            <GoogleLogin
              // className=""
              clientId="453615867535-mmnqpnp68m7du525dnif9647ll1bssi5.apps.googleusercontent.com"
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="bGoogle"><FcGoogle /> Sign Up with Google</button>
              )}
              buttonText="Sign Up with Google"
              onSuccess={respuestaGoogle}
              onFailure={respuestaGoogle}
              cookiePolicy={"single_host_origin"}
            />
            {/* secreto google esu21qkgDbOgSQKwu8JWeBFb */}

          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  signUpUser: authActions.signUpUser,
};

export default connect(null, mapDispatchToProps)(SignUp);
