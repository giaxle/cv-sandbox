import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../context/GlobalProvider";
import axios from "axios";
import style from "./auth.module.scss";
import visible from "../../icons/visible.svg";
import notVisible from "../../icons/not-visible.svg";
import Alert from "../alerts/Alert";

const Login = () => {
  const { setUser, alert, setAlert, alertTimer } = GlobalState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert({
        status: true,
        message: "Please fill in all fields!",
        type: "yellow",
      });
      alertTimer();
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email: email, password: password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setAlert({
        status: true,
        message: "Successfully logged in!",
        type: "green",
      });
      alertTimer();
      navigate("/");
    } catch (error) {
      setValid(false);
    }
  };
  return (
    <div className={style.formContainer}>
      {alert.status && <Alert alert={alert} />}
      <form>
        {valid === false && (
          <div style={{ color: "red" }}>Invalid credentials</div>
        )}

        <div className={style.formControl}>
          <label>Email</label>
          <input
            placeholder="Your email here..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.formControl}>
          <div>
            <label>Password</label>
            <img
              className={style.icon}
              src={show ? notVisible : visible}
              onClick={() => setShow(!show)}
              alt="show"
            />
          </div>
          <input
            type={show ? null : "password"}
            placeholder="Your password here..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={style.submit} onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
