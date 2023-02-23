import React,{ useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { JwtId } from "../helpers/JwtId";
import { isLoggedIn,getAllAssignments } from "../redux/actions";
import AssignmentList from "./AssignmentList";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [count,setCount]=useState(1);
  const loginWithToken = JSON.parse(
    localStorage.getItem("tokeninloacalstorage")
  );
  if (loginWithToken === "") {
    history.push("/");
  }
  const { _id } = JwtId();
  const newAssignments = useSelector((state) => state.user.Assignments);
  const total = useSelector((state) => state.user.totalAssignments);
  const permissions = useSelector((state) => state.user.permissions);
  const isLogin = useSelector((state) => state.user.isLogin);
  var get = "";
  localStorage.setItem("isLogin", JSON.stringify(true));
  if (permissions !== undefined) {
    get = permissions.find((element) => element.permissionId.type === "GET");
  }
  if (isLogin === undefined) {
    dispatch(isLoggedIn(true));
  }
  if(permissions !== undefined && get !== undefined && count === 1){
    dispatch(getAllAssignments(_id))
    setCount(2);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className = "home">
      <form onSubmit = {handleSubmit}>
        {newAssignments && total && permissions && (
          <AssignmentList users={newAssignments} total={total} permissions={permissions} />
        )}
      </form>
    </div>
  );
}

export default Home;
