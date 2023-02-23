import BlogList from "./BlogList";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs, getPermissions } from "./redux/actions";
import { JwtId } from "./helpers/JwtId";
import { isLoggedIn } from "./redux/actions";
import { useHistory } from "react-router-dom";
import { useState } from "react";


function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginWithToken = JSON.parse(
    localStorage.getItem("tokeninloacalstorage")
  );
  if(loginWithToken==""){
    history.push('/')
  }
  const {_id} = JwtId();
  const [count,setCount]=useState(true);
  const newBlog = useSelector((state) => state.user.blogs);
  const total = useSelector((state) => state.user.totalBlogs);
  const permissions =useSelector((state) => state.user.permissions);
  console.log(permissions,"Per")
  const isLogin=useSelector((state)=>state.user.isLogin)
  var get=''
  localStorage.setItem("isLogin", JSON.stringify(true));
  
if(permissions!=undefined){
  get=permissions.find((element) => element.permissionId.type  =="GET")
}

if(isLogin==undefined){
dispatch(isLoggedIn(true));
}

 

  useEffect(() => {
    {_id&&get&&
    dispatch(getAllBlogs(_id))
    }
  },[_id,get])
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //console.log(permissions,"Permissions in home")

  return (
     <div className = "home">
        <form onSubmit = {handleSubmit}>
        {newBlog && total && permissions && <BlogList users = {newBlog} total = {total} permissions={permissions} />}
        </form>
     </div>
  );
}

export default Home;
