import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import { isLoggedIn } from "../redux/actions";

function Utils() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginWithToken = JSON.parse(
    localStorage.getItem("tokeninloacalstorage")
  );
  if (loginWithToken !== "") {
    dispatch(isLoggedIn(true));
    history.push("/home");
  }

}

export default Utils;
