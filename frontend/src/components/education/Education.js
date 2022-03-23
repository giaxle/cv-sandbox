import React from "react";
import style from "./education.module.scss";

const Education = ({ education }) => {
  return (
    <div>
      {education.length !== 0 ? (
        <div className={style.container}>
          <div className={style.headerContainer}>
            <div className={style.header}>Education</div>
          </div>
          <hr />
          <div className={style.eduList}>
            {education.map((edu) => {
              return (
                <div key={edu.id} className={style.eduName}>
                  <div>
                    <strong>{edu.degree}</strong> | {edu.school}
                  </div>
                  <div>
                    {edu.start} - {edu.end}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.headerContainer}>
            <div className={style.header}>Education</div>
          </div>
          <hr />
          <div className={style.eduList}>
            <div className={style.eduName}>
              <div>
                <strong>B.S. in Web Development</strong> | Example School
              </div>
              <div>MON XXXX - MON XXXX</div>
            </div>
            <div className={style.eduName}>
              <div>
                <strong>M.S. in Computer Science</strong> | Example School
              </div>
              <div>MON XXXX - MON XXXX</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
