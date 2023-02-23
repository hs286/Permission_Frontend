import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Login from "./pages/Login";

function App() {
  var isLogin = useSelector((state) => state.user.isLogin);
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
          </Switch>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
