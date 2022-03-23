import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import style from "./home.module.scss";
import Contact from "../../components/contact/Contact";
import ContactForm from "../../components/contact/ContactForm";
import Education from "../../components/education/Education";
import EduForm from "../../components/education/EduForm";
import Experience from "../../components/experience/Experience";
import ExpForm from "../../components/experience/ExpForm";
import Skills from "../../components/skills/Skills";
import SkillForm from "../../components/skills/SkillForm";
import Alert from "../../components/alerts/Alert";
import { GlobalState } from "../../context/GlobalProvider";

import ReactToPrint from "react-to-print";

const Home = () => {
  const {
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
  } = GlobalState();

  const [activeTab, setActiveTab] = useState("contact");

  const componentRef = useRef();

  const saveResumeData = async () => {
    if (!user) {
      setAlert({
        status: true,
        type: "red",
        message:
          "Your session has expired or you're not logged in. Log in to save your progress!",
      });
      alertTimer();
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(
        "/api/resume/update",
        {
          userId: user._id,
          contact: contact,
          skills: skills,
          experience: experience,
          education: education,
        },
        config
      );
      setAlert({
        status: true,
        type: "green",
        message: "Progress saved to database",
      });
      alertTimer();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResumeData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/resume/${user._id}`, config);

      setContact(data.contact);
      setSkills(data.skills);
      setExperience(data.experience);
      setEducation(data.education);
    } catch (error) {
      console.log(error);
      setAlert({
        status: true,
        type: "red",
        message:
          "Your session has expired or and error has occurred. Try to log back in!",
      });
      alertTimer();
      localStorage.removeItem("userInfo");
      setUser();
      setContact();
      setSkills([]);
      setExperience([]);
      setEducation([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchResumeData();
    }
  }, [user]);

  return (
    <div className={style.container}>
      {alert.status && <Alert alert={alert} />}
      <div className={style.inputBox}>
        <div className={style.tabs}>
          <button className={style.printSave} onClick={saveResumeData}>
            Save Progress
          </button>
          <ReactToPrint
            documentTitle="resume"
            trigger={() => (
              <button className={style.printSave}>Download</button>
            )}
            content={() => componentRef.current}
          ></ReactToPrint>
        </div>
        <hr />
        <div className={style.tabs}>
          <button
            className={activeTab === "contact" ? style.activeTab : null}
            onClick={() => {
              setActiveTab("contact");
            }}
          >
            Contact
          </button>
          <button
            className={activeTab === "skills" ? style.activeTab : null}
            onClick={() => {
              setActiveTab("skills");
            }}
          >
            Skills
          </button>
          <button
            className={activeTab === "experience" ? style.activeTab : null}
            onClick={() => {
              setActiveTab("experience");
            }}
          >
            Experience
          </button>
          <button
            className={activeTab === "education" ? style.activeTab : null}
            onClick={() => {
              setActiveTab("education");
            }}
          >
            Education
          </button>
        </div>
        {activeTab === "contact" && (
          <ContactForm contact={contact} setContact={setContact} />
        )}
        {activeTab === "skills" && (
          <SkillForm skills={skills} setSkills={setSkills} />
        )}
        {activeTab === "experience" && (
          <ExpForm experience={experience} setExperience={setExperience} />
        )}
        {activeTab === "education" && (
          <EduForm education={education} setEducation={setEducation} />
        )}
      </div>
      <div ref={componentRef} className={style.previewBox}>
        <div className={style.box}>
          <Contact contact={contact} />
          <div className={style.grid}>
            <Skills skills={skills} />
            <div>
              <Experience experience={experience} />
              <Education education={education} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
