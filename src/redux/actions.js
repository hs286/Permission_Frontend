import axios from "axios";
import dotenv from 'dotenv';
import toast from "react-hot-toast";
import * as types from "./actionType";

dotenv.config();

const newUserAdded = (users) => ({
  type: types.ADD_NEW_USER,
  payload: users,
});

export const addNewUser = (data) => async (dispatch) => {  
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/users/register`,  data );
    toast.success("New user registered successfully")
    dispatch(newUserAdded(res));
  } catch (error) {
    toast.error("Incorrect login credentials")
    console.log(error.message, "Error while adding user");
  }
};

const newAssignmentsAdded = (users) => ({
  type: types.ADD_NEW_ASSIGNMENT,
  payload: users,
});

export const addnewAssignments = (formData) => async (dispatch) => {
  var token='';
  formData.forEach((value,key)=>{
    if(key === 'userId'){
      token=value;
    }
  })
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/Assignments`,formData,{
      headers:{"Content-Type":"multipart/form-data", Authorization: token }
    });
    toast.success("New blog added successfully")
    dispatch(newAssignmentsAdded(res));
  } catch (error) {
    console.log(error.message, "Error while adding assignment");
  }
};

const getingAllAssignments = (users) => ({
  type: types.GET_ASSIGNMENTS,
  payload: users,
});

export const getAllAssignments = (token,page,limit,searchVal) => async (dispatch) => {
  (searchVal === undefined || searchVal === "" ? toast("Getting all assignments") : toast("Searching by title"))
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/Assignments?page=${page}&limit=${limit}&title=${searchVal}`, {
      headers: { Authorization: token },
    });
    dispatch(getingAllAssignments(res.data));
  } catch (error) {
    console.log(error.message, "Error while getting assignments");
  }
};

export const getAllAssignmentsByTitle = (token,searchVal) => async (dispatch) => {
  toast("Getting all assignments by title")
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/Assignments?searchVal=${searchVal}`, {
      headers: { Authorization: token },
    });
    dispatch(getingAllAssignments(res.data));
  } catch (error) {
    console.log(error.message, "Error while getting assignments by title");
  }
};

export const createPermission = (data) => async(dispatch) =>{
try {
  await axios.post(`${process.env.REACT_APP_API}/permission`, data);
} catch (error) {
  console.log(error.message, "Error while creating permissions");
}
} 

const getPermissionsAdded = (res) => ({
  type: types.GET_PERMISSIONS,
  payload: res,
});

export const getPermissions = (id) => async (dispatch) =>{
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/permission/${id}`);
    dispatch(getPermissionsAdded(res))
  } catch (error) {
    console.log(error.message, "Error while getting permissions.");
  }
}

export const checkLoginData = (data) => async (dispatch) => {
  console.log(data.email,data.password)
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/users?email=${data.email}&password=${data.password}`);

    if (res.status === 200) {
      toast.success("Successfully logged in.");
      localStorage.setItem("tokeninloacalstorage", JSON.stringify(res.data.token));
      dispatch(isLoggedIn(true));
    } 
  } catch (error) {
    toast.error("The credential with which you have logged in are not registered.",error.message)
  }
};

export const updateBlog = (id, data,_id) => async () => {
  toast("Updating assignment.")
  try {
    await axios.put(`${process.env.REACT_APP_API}/Assignments/${id}`,  data,{headers:{Authorization:_id},});
    toast.success("Assignment updated successfully");

  } catch (error) {
    toast.error("Unable to Update Assignment",error)
    console.log(error.message, "Error while updating assignment");
  }
};

export const deleteBlog = (id,token) => async (dispatch) => {
  toast("Deleting the assignment")

  try {
    const res=await axios.delete(`${process.env.REACT_APP_API}/Assignments/${id}`,{
      headers: { Authorization: token },
    });
    toast.success("Assignment deleted successfully")

    dispatch(getAllAssignments(res.data.userId));
  } catch (error) {
    toast.error(error.message, "Error while deleting the assignment");
    console.log(error.message, "Error while deleting assignment api");
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
