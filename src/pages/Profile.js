import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettProfileData } from "../redux/actions";

function Profile() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  //dispatch(gettProfileData(token));
  const users = useSelector((state) => state.user.oneuser);
  const handleSubmit = (e) => {
    e.preventdefault();
  };
  return (
    <>
      <div className="create">
        {users && (
          <form onSubmit={handleSubmit}>
            <h4>Name: </h4>
            <p>{users[0].name}</p>
            <h4>Email:</h4>
            <p>{users[0].email}</p>
            <h4>Age: </h4>
            <p>{users[0].age}</p>
          </form>
        )}
      </div>
    </>
  );
}

export default Profile;
