import React, { Component, useEffect, useState } from "react";
import "./Login.css";
import * as Yup from "yup";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import logo from "../../images/logo.png";
import axios from "axios";
import videolog from "../../images/videologo.png";
// import uplogo from "../../images/uplogo.png";
import { useNavigate } from "react-router-dom";
import { Config } from "../../Config/config";
import { Field, Formik } from "formik";
import { Box, CircularProgress } from "@mui/material";
import { TextField } from "formik-mui";

const { API_URL } = Config;

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const getLoginData = (setSubmitting) => {
    setSubmitting(true);
    let config = {
      method: "post",
      url: `${API_URL}auth/login`,
      data: {
        username_or_email: name,
        password: password,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setSubmitting(false);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const initialValues = {
    name,
    password,
  };

  return (
    <div className="text">
      <div
        style={{
          backgroundImage: `url(${img1})`,
          width: "50%",
          height: "100vh",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} width={300} />
      </div>

      <div
        style={{
          backgroundImage: `url(${img2})`,
          width: "50%",
          height: "100vh",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loginfrom">
          {/* <img src={uplogo} className="uplogo" /> */}
          <img src={videolog} className="videologo" />
          <h1 className="heading">Welcome back</h1>
          <p className="subheading">Enter your email and password to Log In</p>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              getLoginData(setSubmitting);
            }}
          >
            {({
              errors,
              handleSubmit,
              isSubmitting,
              touched,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    mb: "20px",
                  }}
                >
                  <Field
                    component={TextField}
                    name="name"
                    value={name}
                    fullWidth
                    size="small"
                    placeholder="Enter your email"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box
                  sx={{
                    marginBottom: "20px",
                  }}
                >
                  <Field
                    component={TextField}
                    type="password"
                    value={password}
                    fullWidth
                    size="small"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
                {/* <div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div> */}

                <button
                  className="button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={20} /> : "Login"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default Login;
