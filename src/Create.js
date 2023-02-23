import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewBlog } from "./redux/actions";
import { JwtId } from "./helpers/JwtId";
import React from "react";
import avatar from './assets/ProfileImg.png'

function Create  ()  {
  const dispatch = useDispatch();
  const [image,setImage] = useState('');
  const history = useHistory();
  const {_id,role}=JwtId();
  const [state, setState] = useState({
    title: "",
    body: "",
    userId: _id,
    role:role,
    
  });
  var { title, body} = state;

  const handleInputChange = (e) => 
  {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleInputImage = async (e)=>{
    const file = e.target.files[0];
    setImage(file)
  }

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    const formData=new FormData();
    formData.append('file',image)
    formData.append('title',state.title)
    formData.append('body',state.body)
    formData.append('userId',state.userId)
    formData.append('userRole',state.role)
    dispatch(addNewBlog(formData));
     history.push("/home");
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit = {handleSubmit}>
        <label>Blog title:</label>
        <input
          name = "title"
          value = {title}
          onChange = {handleInputChange}
        />
        <label>Blog body:</label>
        <input
          name = "body"
          value = {body}
          onChange = {handleInputChange}
        ></input>
        <label htmlFor = "file-upload" className = "custom-file-upload"><img src = {state.myFile || avatar } alt="Empty"/></label>
        <input id = 'file-upload' label = "Image"   name = "myFile" type = "file" accept = {"jpeg" || "png"} onChange={(e) => {handleInputImage(e)}}/>
        <button>Add Blog</button>
      </form>
    </div>
  );
};

export default Create

