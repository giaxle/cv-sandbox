import React from "react";
import style from "./contact.module.scss";

const Contact = ({ contact }) => {
  return (
    <div>
      {contact ? (
        <>
          <div className={style.name}>{contact.name}</div>
          <ul className={style.contact}>
            <hr />
            <li>{contact.address}</li>
            <hr />
            <li>{contact.email}</li>
            <hr />

            <li>{contact.phone}</li>
            <hr />
          </ul>
        </>
      ) : (
        <>
          <div className={style.name}>John Doe</div>
          <ul className={style.contact}>
            <hr />
            <li>New York, NY</li>
            <hr />
            <li>johndoe@example.com</li>
            <hr />

            <li>(555) 555-5555</li>
            <hr />
          </ul>
        </>
      )}
    </div>
  );
};

export default Contact;
