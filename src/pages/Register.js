import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewUser } from "../redux/actions";
import Button from "react-bootstrap/esm/Button";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({ role: "Teacher" });
  const { email, name, age, password } = state;
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewUser(state));
    //history.push("/");
  };
  const handleClick = () => {};

  localStorage.setItem("isLogin", JSON.stringify(false));

  return (
    <div className="container-md container-fluid ">
      <div className="row">
        <div className="col-md-8 col-sm-10 col-12 mx-auto">
          <h2 className="text-center">Register User</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Email">
                Email:
              </label>
              <input
                id="Email"
                className="form-control"
                type="email"
                required
                name="email"
                placeholder="e.g:h@gmail.com"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Name">
                Name:
              </label>
              <input
                id="Name"
                className="form-control"
                type="text"
                name="name"
                placeholder="Bob Jes"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Role">
                Role:
              </label>

              <select
                class="form-select"
                id="Role"
                name="role"
                onChange={handleInputChange}
              >
                <option>Teacher</option>
                <option>Student</option>
              </select>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Age">
                Age:
              </label>
              <input
                id="Age:"
                className="form-control"
                type="number"
                required
                name="age"
                value={age}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                required
                name="password"
                minLength="8"
                placeholder="**********"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <Button type="submit" variant="secondary" onClick={handleClick}>
                Register
              </Button>
              <Link to={"/"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
