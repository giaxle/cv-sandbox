import React from "react";
import style from "./skills.module.scss";

const Skills = ({ skills }) => {
  return (
    <div>
      {skills.length !== 0 ? (
        <div className={style.container}>
          <div className={style.headerContainer}>
            <div className={style.header}>Skills</div>
          </div>
          <hr />
          <ul className={style.skills}>
            {skills.map((skill, i) => {
              return <li key={i}>{skill.name}</li>;
            })}
          </ul>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.headerContainer}>
            <div className={style.header}>Skills</div>
          </div>
          <hr />
          <ul className={style.skills}>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>SASS</li>
            <li>Node.js</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Skills;
