import jwt_decode from "jwt-decode";

export const JwtId = () => {
  const token = JSON.parse(localStorage.getItem("tokeninloacalstorage"));
  const tokenDecoded = jwt_decode(token);
  return tokenDecoded;
};
