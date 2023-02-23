import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";


function Utils() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginWithToken = JSON.parse(
    localStorage.getItem("tokeninloacalstorage")
  );
  if (loginWithToken !== "") {
    history.push("/home");
  }

}

export default Utils;
