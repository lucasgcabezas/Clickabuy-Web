import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import storeActions from "../redux/actions/storeActions";

const validationSchema = yup.object({


  bName: yup.string("Enter business name").required("Business Name is required"),

  category: yup.string().required("category is required!"),
});
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SignUpStore = (props) => {
  const classes = useStyles();
  /*  console.log(props.categories); */
  const [photo, setPhoto] = useState({ userImg: "" });
  const [photoName, setPhotoName] = useState({ userImgName: "" });
  const [ta, setTA] = useState({ description: "" });
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const formik = useFormik({
    initialValues: {

      bName: "",
      description: "",
      category: "",
      storeLogo: "",

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      alert(ta.description);
      let formData = new FormData();

      formData.append("bName", values.bName);
      formData.append("description", ta.description);
      formData.append("category", values.category);

      formData.append("userImg", photo.userImg);

      console.log("soy el values", values);
      console.log("soy el Formdata", formData);

      /*   props.addStore(formData); */
    },
  });

  const cargarFoto = (e) => {
    setPhoto({ userImg: e.target.files[0] });
    console.log("soy el e", e.target.files[0].name);
    setPhotoName({ userImgName: e.target.files[0].name });
  };

  const cargarTA = (e) => {
    /* console.log("TA",e.nativeEvent.data) */
    console.log("TargetValue", e.target.value)

    setTA({ description: e.target.value });
  };


  return (
    <div className="contenedorSignUp">
      <video src="./assets/formVideo.mp4" autoPlay loop muted className="videoForm"></video>
      {/* <div className="contenedorHeaderSignUp"> */}
        <Link to="/" className="backToHome"><span class="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</Link>
      {/* </div> */}
      <div className="contenedorFormAdminStore">
      <div className="contenedorInfoFormAdminStore">
        <h3>Complete your Business Data</h3>
        <Link to="/SignUp" className="linkPersonAccount">
          <div className="d-flex justify-content-end">
            <label className="btn text-primary">Create a person account </label>
          </div>
        </Link>
        <form onSubmit={formik.handleSubmit}>
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
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            className="selectSignUpStore"
          >
            <option value="" label="Select a category" />
            {props.categories.map((category) => {
              return <option value={category.nameCategory} label={category.nameCategory} />;
            })}
          </select>
          <textarea placeHolder="description of your business (optional)" onChange={(e) => cargarTA(e)} className="textareaSignUpStore"></textarea>
          <div>
              <label htmlFor="userImg" className="buttonInputFile">
                Choose Your Image
              <input id="userImg" name="userImg" type="file" style={{ display: "none" }} onChange={cargarFoto} />
              </label>
              <span>{photoName.userImgName}</span>
            </div>
          <Button variant="contained" fullWidth type="submit">Create a new Store</Button>
        </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer.categories,
  };
};

const mapDispatchToProps = {
  addStore: storeActions.addStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStore);
