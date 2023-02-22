import BlogList from "./BlogList";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "./redux/actions";
import { useHistory } from "react-router-dom";
import Utils from "./helpers/Utils";
import { JwtId } from "./helpers/JwtId";

// import * as jwt_decode from "jwt-decode";

function Home() {
 
  const history =useHistory()
  const dispatch = useDispatch();
  localStorage.setItem("isLogin", JSON.stringify(true));
  const newBlog = useSelector((state) => state.user.blogs);
  const total = useSelector((state) => state.user.totalBlogs);
  console.log(newBlog)
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        {newBlog&&total&&<BlogList users={newBlog} total={total} />}
      </form>
    </div>
  );
}

export default Home;
