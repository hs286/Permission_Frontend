import Navbar from "./Navbar";
import Home from "./Home";
 import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import Update from "./Update";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "./redux/actions";
import React from "react";

function App() {

  var isLogin = useSelector((state) => state.user.isLogin);
  const dispatch=useDispatch()
  useEffect(() => {
      const data=JSON.parse(localStorage.getItem("isLogin"))
      dispatch(isLoggedIn(data))
      console.log("login bool",isLogin,data)
  });
  return (
    <>
    <Router>
      <div className="App">
        {isLogin ? <Navbar /> :null }
        <div className="content">
          <Switch>
            
            <Route exact path="/">
              {<Login />}
            </Route>
            <Route exact path="/home">
              {<Home />}
            </Route>
            <Route exact path="/create">
              {<Create />}
            </Route>
            <Route exact path="/update">
              {<Update />}
            </Route>
           
            <Route exact path="/register">
              {<Register />}
            </Route>
            {/* <Route exact path="/profile">
              {<Profile />}
            </Route> */}
          </Switch>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
