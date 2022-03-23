import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [contact, setContact] = useState();
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const alertTimer = () => {
    setTimeout(() => setAlert({ status: false, message: "", type: "" }), 4000);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUser(userInfo);
    } else {
      return;
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        contact,
        setContact,
        skills,
        setSkills,
        experience,
        setExperience,
        education,
        setEducation,
        alert,
        setAlert,
        alertTimer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalState = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
