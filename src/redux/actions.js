import * as types from "./actionType";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const newUserAdded = (users) => ({
  type: types.ADD_NEW_USER,
  payload: users,
});

export const addNewUser = (data) => async (dispatch) => {  
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/users/register`,  data );
    
     
    console.log(res.data, "Token in check action in new User");
    dispatch(newUserAdded(res));
  } catch (error) {
    console.log(error.message, "Error while Adding User");
  }
};

const newBlogAdded = (users) => ({
  type: types.ADD_NEW_BLOG,
  payload: users,
});

export const addNewBlog = (formData) => async (dispatch) => {
  var token='';
  formData.forEach((value,key)=>{
    console.log(key,value,"foreach action")
    if(key=='userId'){
token=value;
    }
  })
  try {
    console.log(token)
    const res = await axios.post(`${process.env.REACT_APP_API}/blogs`,formData,{
      headers:{"Content-Type":"multipart/form-data", Authorization: token }
    });
    console.log(res,"in action response")
    dispatch(newBlogAdded(res));
  } catch (error) {
    console.log(error.message, "Error while Adding Blog");
  }
};

const getingAllBlogs = (users) => ({
  type: types.GET_NEW_BLOG,
  payload: users,
});

export const getAllBlogs = (token,page,limit,searchVal) => async (dispatch) => {
  console.log(searchVal,token,"inaction getallblogs")
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/blogs?page=${page}&limit=${limit}&title=${searchVal}`, {
      headers: { Authorization: token },
    });
    dispatch(getingAllBlogs(res.data));
  } catch (error) {
    console.log(error.message, "Error while Calling Api");
  }
};

export const getAllBlogsByTitle = (token,searchVal) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/blogs?searchVal=${searchVal}`, {
      headers: { Authorization: token },
    });
    dispatch(getingAllBlogs(res.data));
  } catch (error) {
    console.log(error.message, "Error while Calling Api");
  }
};

export const createPermission = (data) => async(dispatch) =>{
try {
  const res = await axios.post(`${process.env.REACT_APP_API}/permission`, data);
  console.log(res,"In create action permission")
} catch (error) {
  console.log(error.message, "Error while creating Permissions");

}
} 

const getPermissionsAdded = (res) => ({
  type: types.IS_GET_PERMISSION,
  payload: res,
});

export const getPermissions = (id) => async (dispatch) =>{
  try {
    console.log(id,"get permisssions of action")
    const res = await axios.get(`${process.env.REACT_APP_API}/permission/${id}`);
    console.log(res,"after geting permini in action")
    dispatch(getPermissionsAdded(res))
  } catch (error) {
    console.log(error.message, "Error while Getting Permissions");
  }
}

// const checkingLoginData = () => ({
//   type: types.CHECK_LOGIN_DATA,
// });
export const checkLoginData = (data) => async (dispatch) => {
  console.log({data},"in action")
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/users/login`, data);
    const {_id}=res.data.newUser[0];
    console.log("in check action ",_id,"in res")

      //dispatch(getPermissions(_id))
    //console.log(res,"Inlogin after res")
    // dispatch(getPermissions(res._id))
    if (res.status== 200) {
      localStorage.setItem("tokeninloacalstorage", JSON.stringify(res.data.token));
      // dispatch(checkingLoginData());
      dispatch(isLoggedIn(true));
      
    } 
    else if(res.status==500) {
      window.alert(
        "The credential with which you have logged in are not registered"
      );
    }
  } catch (error) {
    window.alert(
      "The credential with which you have logged in are not registered"
    );
    console.error("Error while Calling Api in Checkin")
    console.log(error.message, "Error while Calling Api in Checkin");
  }
};

export const updateBlog = (id, data,_id) => async () => {
  console.log(data, "in acion", id, "id");
  try {
    await axios.put(`${process.env.REACT_APP_API}/blogs/${id}`,  data,{headers:{Authorization:_id},});
  } catch (error) {
    console.log(error.message, "Error while updating blog Api");
  }
};

export const deleteBlog = (id,token) => async (dispatch) => {
  console.log(id,token,"Indelete")
  try {
    const res=await axios.delete(`${process.env.REACT_APP_API}/blogs/${id}`,{
      headers: { Authorization: token },
    });
    console.log(res.data.userId)
    dispatch(getAllBlogs(res.data.userId));

  } catch (error) {
    console.log(error.message, "Error while Deleting blog Api");
  }
};

const isLoggedInChecked = (val) => ({
  type: types.IS_LOGGED_IN,
  payload: val,
});

export const isLoggedIn = (val) => {
  return function (dispatch) {
    localStorage.setItem("isLogin", JSON.stringify(val));
    const data = JSON.parse(localStorage.getItem("isLogin"));
    dispatch(isLoggedInChecked(data));
  };
};
