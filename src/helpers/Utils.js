import { useHistory } from "react-router-dom";

function Utils() {
  const history = useHistory();
  const loginWithToken = JSON.parse(
    localStorage.getItem("tokeninloacalstorage")
  );
  if (loginWithToken !== "") {
    history.push("/home");
  }

}

export default Utils;
