import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLoggedIn } from "./redux/actions";

function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <h1>Hamza Todo App</h1>
      <div className="links">
        <Link to={"/home"}>Home</Link>
        <Link to={"/create"}>Add Todo</Link>
        <Link
          to={"/"}
          onClick={() => {
            dispatch(isLoggedIn(false));
            localStorage.setItem(
              "tokeninloacalstorage",
              JSON.stringify("")
            );
          }}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
