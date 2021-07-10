import axios from "axios";
var tokenValid = false;
const isTokenValid = async () => {
  await axios({
    method: "GET",
    headers: { "x-auth-token": localStorage.getItem("token") },
    url: "http://localhost:5000/api/auth/user",
  })
    .then((res) => {
      tokenValid = true;
      console.log(res);
    })
    .catch((err) => {
      tokenValid = false;
      console.log(err);
    });
  console.log(tokenValid);
  return tokenValid;
};

export default isTokenValid;
