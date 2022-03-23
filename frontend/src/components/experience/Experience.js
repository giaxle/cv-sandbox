import React from "react";
import style from "./experience.module.scss";

const Experience = ({ experience }) => {
  return (
    <div>
      {experience.length !== 0 ? (
        <div className={style.container}>
          <div className={style.headerContainer}>
            <div className={style.header}>Experience</div>
          </div>
          <hr />
          <div className={style.expList}>
            {experience.map((exp, i) => {
              return (
                <div key={i}>
                  <div className={style.expName}>
                    <div>
                      <strong>{exp.company}</strong> | {exp.position}
                    </div>
                    <div>
                      {exp.start} - {exp.end}
                    </div>
                  </div>
                  <div className={style.description}>{exp.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.headerContainer}>
            <div className={style.header}>Experience</div>
          </div>
          <hr />
          <div className={style.expList}>
            <div>
              <div className={style.expName}>
                <div>
                  <strong>Example Company</strong> | Position
                </div>
                <div>MON XXXX - MON XXXX</div>
              </div>
              <div className={style.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </div>
            </div>
            <div>
              <div className={style.expName}>
                <div>
                  <strong>Example Company</strong> | Position
                </div>
                <div>MON XXXX - MON XXXX</div>
              </div>
              <div className={style.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </div>
            </div>
            <div>
              <div className={style.expName}>
                <div>
                  <strong>Example Company</strong> | Position
                </div>
                <div>MON XXXX - MON XXXX</div>
              </div>
              <div className={style.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
