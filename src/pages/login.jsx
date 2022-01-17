import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";

var BearerToken = "";

/*
  nedded value for login
  username: "erp_user",
  password: "12qwaszx12qwaszx",
*/

const Login = () => {
  let navigate = useNavigate();
  const login = () => {
    var username = document.getElementById("name").value
    var password = document.getElementById("password").value
    axios
      .post("http://erp.apptrix.ru/api/token/", {
        username: username,
        password: password
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        BearerToken = "Bearer " + res.data.access;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          axios
            .post("http://erp.apptrix.ru/api/token/refresh/", {
              refresh: localStorage.getItem("refresh_token"),
            })
            .then((res) => {
              localStorage.setItem("access_token", res.data.access);
            });
        } else {
          localStorage.clear();
          navigate(`/registration`);
        }
      });
  }
  return <div>
        <Header />
        <input id="name" placeholder="username" />
        <input id="password" placeholder="password" />
        <button onClick={login}>
          login
        </button>
      </div>
};
export default Login;
