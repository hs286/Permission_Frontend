import React,{ useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "./redux/actions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import Update from "./Update";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { JwtId } from "./helpers/JwtId";

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
