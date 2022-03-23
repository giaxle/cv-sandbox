import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./auth.module.scss";
import visible from "../../icons/visible.svg";
import notVisible from "../../icons/not-visible.svg";
import axios from "axios";
import { GlobalState } from "../../context/GlobalProvider";
import Alert from "../alerts/Alert";

const Signup = () => {
  const { setUser, alert, setAlert, alertTimer } = GlobalState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [show, setShow] = useState("");
  const [valid, setValid] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirm) {
      setAlert({
        status: true,
        message: "Please fill in all fields!",
        type: "yellow",
      });
      alertTimer();
      return;
    }

    if (password !== passwordConfirm) {
      setAlert({
        status: true,
        message: "Your passwords don't match!",
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
        "/api/user/register",
        {
          name,
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setAlert({
        status: true,
        message: "Account successfully registered!",
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
          <div style={{ color: "red" }}>User already exists</div>
        )}
        <div className={style.formControl}>
          <label>Name</label>
          <input
            placeholder="Your name here..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            placeholder="Your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={style.formControl}>
          <div>
            <label>Password Confirmation</label>
            <img
              className={style.icon}
              src={show ? notVisible : visible}
              onClick={() => setShow(!show)}
              alt="show"
            />
          </div>
          <input
            type={show ? null : "password"}
            placeholder="Confirm your password..."
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className={style.submit} onClick={handleSubmit}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
