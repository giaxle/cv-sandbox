import React, { useState } from "react";
import Signup from "../../components/auth/Signup";
import Login from "../../components/auth/Login";
import style from "./auth.module.scss";

const Auth = () => {
  const [selectedTab, setSelectedTab] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <div className={style.logo}>CV - Sandbox</div>
      </div>
      <div className={style.auth}>
        <div className={style.tabs}>
          <button
            className={selectedTab === false ? style.activeTab : style.tab}
            onClick={() => setSelectedTab(false)}
          >
            Login
          </button>
          <button
            className={selectedTab === true ? style.activeTab : style.tab}
            onClick={() => setSelectedTab(true)}
          >
            Signup
          </button>
        </div>
        {selectedTab === false ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;
