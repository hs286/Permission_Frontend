import React, { useState} from "react";
import {  useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBlog } from "./redux/actions";
import { JwtId } from "./helpers/JwtId";


function Update() {
  const dispatch = useDispatch();
  const history = useHistory();
  const singleBlog=JSON.parse(localStorage.getItem("userToBeEdit"))
  const [title, setTitle] = useState(singleBlog.title);
  const [body, setBody] = useState(singleBlog.body);
  const {_id} = JwtId();


  const handleSubmit = (e) => {
    e.preventDefault();
    singleBlog.title = title;
    singleBlog.body = body;
    dispatch(updateBlog(singleBlog._id,singleBlog,_id));
    history.push("/home");
  };

  return (
    <div>
      <div className="create">
        <h2>Update Blog</h2>
        {
          <form onSubmit={handleSubmit}>
            <div>
              <label>Blog title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Blog body:</label>
              <input
                required
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></input>
              <button>Update</button>
            </div>
          </form>
        }
      </div>
    </div>
  );
}

export default Update;
