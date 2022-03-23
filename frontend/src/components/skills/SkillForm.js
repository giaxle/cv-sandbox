import React, { useState } from "react";
import style from "./skills.module.scss";
import { v4 as uuidv4 } from "uuid";
import clear from "../../icons/clear.svg";
import { GlobalState } from "../../context/GlobalProvider";

const SkillForm = ({ skills, setSkills }) => {
  const { setAlert, alertTimer } = GlobalState();
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill) {
      setAlert({
        status: true,
        type: "yellow",
        message: "Please fill in the skill field!",
      });
      alertTimer();
      return;
    }

    const skill = {
      id: uuidv4(),
      name: newSkill,
    };

    setSkills([...skills, skill]);
    setNewSkill("");
  };

  const removeSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };
  return (
    <div className={style.formContainer}>
      <form className={style.form}>
        <h2>Edit Skills</h2>
        <ul>
          {skills.map((skill) => {
            return (
              <li className={style.skillBadge} key={skill.id}>
                <div>{skill.name}</div>
                <img
                  src={clear}
                  alt="clear"
                  onClick={() => removeSkill(skill.id)}
                />
              </li>
            );
          })}
        </ul>
        <div className={style.formControl}>
          <input
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter your skill here..."
            value={newSkill}
          />
        </div>
        <div className={style.btnContainer}>
          <button className={style.saveBtn} onClick={addSkill}>
            Add
          </button>
          {/* <button
            onClick={() => {
              setEdit(false);
              setNewSkill("");
            }}
          >
            Close
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
