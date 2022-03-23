import React from "react";
import style from "./navbar.module.scss";
import { Link } from "react-router-dom";
import { GlobalState } from "../../context/GlobalProvider";

const NavBar = () => {
  const {
    user,
    setUser,
    setContact,
    setSkills,
    setExperience,
    setEducation,
    setAlert,
    alertTimer,
  } = GlobalState();

  const handleLogout = () => {
    setUser();
    setContact();
    setSkills([]);
    setExperience([]);
    setEducation([]);
    localStorage.removeItem("userInfo");
    setAlert({
      status: true,
      type: "green",
      message: "Successfully logged out!",
    });
    alertTimer();
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.logo}>
          <Link className={style.link} to="/">
            CV - Sandbox
          </Link>
        </div>
        <nav>
          <ul className={style.list}>
            <li>
              <Link className={style.link} to="/">
                Home
              </Link>
            </li>
            {user ? (
              <li className={style.listItem} onClick={handleLogout}>
                Logout
              </li>
            ) : (
              <li>
                <Link className={style.link} to="/auth">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
