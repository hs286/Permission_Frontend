import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLoggedIn } from "./redux/actions";
import { JwtId } from "./helpers/JwtId";
import { getPermissions } from "./redux/actions";
import { useSelector } from "react-redux";



function Navbar() {
  const { role,_id } = JwtId();
  const dispatch = useDispatch();
  const permissions =useSelector((state) => state.user.permissions);
  var post='';

  useEffect(()=>{
    dispatch(getPermissions(_id))
  },[_id])

  if(permissions!=undefined){
    permissions.forEach(element => {
      if(element.permissionId.type==='POST'){
       post="POST";
     }
   });}
  return (
    <nav className="navbar">
      <h1>{role} Portal</h1>
      <div className = "links">
        <Link to = {"/home"}>Home</Link>
        {post && <Link to = {"/create"}>Add Assignments</Link>}
        <Link
          to = {"/"}
          onClick = {() => {
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
