import React, { useState } from "react";
import { GlobalState } from "../../context/GlobalProvider";
import style from "./contact.module.scss";

const ContactForm = ({ setContact }) => {
  const { setAlert, alertTimer } = GlobalState();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const saveInfo = (e) => {
    e.preventDefault();
    if (!name || !address || !phone || !email) {
      setAlert({
        status: true,
        type: "yellow",
        message: "Please fill in all fields!",
      });
      alertTimer();
      return;
    }
    setContact({
      name: name,
      address: address,
      phone: phone,
      email: email,
    });
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form}>
        <h2>Edit Contact</h2>
        <div className={style.formControl}>
          <label>Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Firstname Lastname..."
            value={name}
            required
          />
        </div>
        <div className={style.formControl}>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex. johndoe@example.com..."
            value={email}
            required
          />
        </div>
        <div className={style.formControl}>
          <label>Address</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            placeholder="ex. Houston, TX..."
            value={address}
            required
          />
        </div>
        <div className={style.formControl}>
          <label>Phone #</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            placeholder="ex. (555) 555-5555..."
            value={phone}
            required
          />
        </div>
        <div className={style.btnContainer}>
          <button className={style.saveBtn} onClick={saveInfo}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
