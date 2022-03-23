import React, { useState } from "react";
import style from "./experience.module.scss";
import clear from "../../icons/clear.svg";
import edit from "../../icons/edit.svg";
import { v4 as uuidv4 } from "uuid";
import { GlobalState } from "../../context/GlobalProvider";

const ExpForm = ({ experience, setExperience }) => {
  const { setAlert, alertTimer } = GlobalState();

  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [expToUpdate, setExpToUpdate] = useState();

  const addExperience = (e) => {
    e.preventDefault();
    if (!company || !position || !description || !start || !end) {
      setAlert({
        status: true,
        type: "yellow",
        message: "Please fill in all fields!",
      });
      alertTimer();
      return;
    }

    const newExp = {
      id: uuidv4(),
      company: company,
      position: position,
      description: description,
      start: start,
      end: end,
    };
    setCompany("");
    setPosition("");
    setDescription("");
    setEnd("");
    setStart("");
    setExperience([...experience, newExp]);
  };

  const updateExperience = (e) => {
    e.preventDefault();
    if (!company || !description || !start || !end) {
      setAlert({
        status: true,
        type: "yellow",
        message: "Please fill in all fields!",
      });
      alertTimer();
      return;
    }

    let updatedArr = experience.map((item) => {
      if (item === expToUpdate) {
        return {
          ...item,
          company: company,
          position: position,
          description: description,
          start: start,
          end: end,
        };
      }
      return item;
    });

    setExperience(updatedArr);

    discardEdit(e);
  };

  const discardEdit = (e) => {
    e.preventDefault();
    setToggleEdit(false);
    setExpToUpdate("");
    setCompany("");
    setPosition("");
    setDescription("");
    setStart("");
    setEnd("");
  };

  const removeExperience = (id) => {
    setExperience(experience.filter((item) => item.id !== id));
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form}>
        <h2>Add Experience</h2>
        <ul>
          {experience.map((item) => {
            return (
              <li key={item.id} className={style.badgeItem}>
                <div>{item.company}</div>
                <div className={style.badgeBtnContainer}>
                  <div
                    className={style.badgeBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setToggleEdit(true);
                      setExpToUpdate(item);
                      setCompany(item.company);
                      setPosition(item.position);
                      setDescription(item.description);
                      setStart(item.start);
                      setEnd(item.end);
                    }}
                  >
                    <img src={edit} alt="edit" />
                  </div>
                  <div
                    className={style.badgeBtn}
                    onClick={(e) => {
                      removeExperience(item.id);
                      discardEdit(e);
                    }}
                  >
                    <img src={clear} alt="clear" />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={style.formControl}>
          <label>Company Name</label>
          <input
            onChange={(e) => setCompany(e.target.value)}
            placeholder="ex.  Average Company..."
            value={company}
            required
          />
        </div>
        <div className={style.formControl}>
          <label>Position Title</label>
          <input
            onChange={(e) => setPosition(e.target.value)}
            placeholder="ex.  Web Developer..."
            value={position}
            required
          />
        </div>
        <div className={style.formControl}>
          <label>Description</label>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summarize what you do..."
            value={description}
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
              <button className={style.saveBtn} onClick={updateExperience}>
                Update
              </button>
              <button onClick={discardEdit}>Cancel</button>
            </>
          ) : (
            <button className={style.saveBtn} onClick={addExperience}>
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpForm;
