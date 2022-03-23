import React, { useState } from "react";
import style from "./education.module.scss";
import { v4 as uuidv4 } from "uuid";
import clear from "../../icons/clear.svg";
import edit from "../../icons/edit.svg";
import { GlobalState } from "../../context/GlobalProvider";

const EduForm = ({ education, setEducation }) => {
  const { setAlert, alertTimer } = GlobalState();

  const [eduToUpdate, setEduToUpdate] = useState();
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);

  const addEducation = (e) => {
    e.preventDefault();
    if (!school || !degree || !start || !end) {
      setAlert({
        status: true,
        type: "yellow",
        message: "Please fill in all fields!",
      });
      alertTimer();
      return;
    }
    const newEdu = {
      id: uuidv4(),
      school: school,
      degree: degree,
      start: start,
      end: end,
    };

    setEducation([...education, newEdu]);
    setSchool("");
    setDegree("");
    setStart("");
    setEnd("");
  };

  const updateEducation = (e) => {
    e.preventDefault();
    if (!school || !degree || !start || !end) {
      alert("Fill in all fields!");
      return;
    }
    let updatedArr = education.map((item) => {
      if (item === eduToUpdate) {
        return {
          ...item,
          school: school,
          degree: degree,
          start: start,
          end: end,
        };
      }
      return item;
    });

    setEducation(updatedArr);
    discardEdit(e);
  };

  const discardEdit = (e) => {
    e.preventDefault();
    setToggleEdit(false);
    setEduToUpdate("");
    setSchool("");
    setDegree("");
    setStart("");
    setEnd("");
  };

  const removeEducation = (id) => {
    setEducation(education.filter((item) => item.id !== id));
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form}>
        <h2>Add Education</h2>
        <ul>
          {education.map((item) => {
            return (
              <li key={item.id} className={style.badgeItem}>
                <div>{item.school}</div>
                <div className={style.badgeBtnContainer}>
                  <div className={style.badgeBtn}>
                    <img
                      src={edit}
                      alt="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        setToggleEdit(true);
                        setEduToUpdate(item);
                        setSchool(item.school);
                        setDegree(item.degree);
                        setStart(item.start);
                        setEnd(item.end);
                      }}
                    />
                  </div>
                  <div
                    className={style.badgeBtn}
                    onClick={() => removeEducation(item.id)}
                  >
                    <img src={clear} alt="clear" />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={style.formControl}>
          <label>School Name</label>
          <input
            onChange={(e) => setSchool(e.target.value)}
            placeholder="ex. Albany University..."
            value={school}
            required
          />
        </div>
        <div className={style.formControl}>
          <label>Degree</label>
          <input
            onChange={(e) => setDegree(e.target.value)}
            placeholder="ex. B.S. in Web Development...  "
            value={degree}
            required
          />
        </div>
        <div className={style.formControl}>
          <label>Start Date</label>
          <input
            onChange={(e) => setStart(e.target.value)}
            placeholder="ex. Jan 2020..."
            value={start}
            required
          />
        </div>
        <div className={style.formControl}>
          <label>End Date</label>
          <input
            onChange={(e) => setEnd(e.target.value)}
            placeholder="ex. Jan 2020 or Present..."
            value={end}
            required
          />
        </div>
        <div className={style.btnContainer}>
          {toggleEdit === true ? (
            <>
              <button className={style.saveBtn} onClick={updateEducation}>
                Update
              </button>
              <button onClick={discardEdit}>Cancel</button>
            </>
          ) : (
            <button className={style.saveBtn} onClick={addEducation}>
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EduForm;
