import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkLoginData, isLoggedIn } from "../redux/actions";
import utils from "../helpers/Utils";
import Button from "react-bootstrap/esm/Button";

function Login() {
  utils();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    var state = {
      email: email,
      password: password,
    };
    dispatch(checkLoginData(state));
    setEmail("");
    setPassword("");
    };

  return (
    <>
      <div className = "container-md container-fluid ">
        <div className = "row">

        <div className = "col-md-8 col-sm-10 col-12 mx-auto">
          <h2 className = "text-center">Login Page</h2>
          <form>
            <div className = "form-outline mb-4" >
              <label className = "form-label" htmlFor = "Email">Email:</label>
              <input
                id = "Email"
                className = "form-control"
                type = "email"
                required
                name = "email"
                placeholder = "e.g:h@gmail.com"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
              />
            </div>
            <div className = "form-outline mb-4" >
              <label className = "form-label" htmlFor = "password">Password:</label>
              <input
              id = "password"
              className = "form-control"
                type = "password"
                required
                name = "password"
                minLength = "8"
                placeholder = "**********"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
              />
            </div>
            <div className = "d-flex justify-content-between">
              <Button variant = "secondary" onClick = {handleClick}>Login</Button>
              <Link to = {"/register"}>Register</Link>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>
  );
}

export default Login;
