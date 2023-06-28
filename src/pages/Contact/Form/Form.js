import React, { useState } from "react";
import classes from "./Form.module.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (name && email && subject && message) {
      const URI_API = `https://api.telegram.org/bot${process.env.REACT_APP_TOKEN}/sendMessage`;

      let messageTelegram = `<b>#Mongo.uz</b>\n\n`;
      messageTelegram += `<b>Contact Us </b>\n`;
      messageTelegram += `<b>Name: </b> ${name}\n`;
      messageTelegram += `<b>Email: </b> ${email}\n`;
      messageTelegram += `<b>subject: </b> ${subject}\n`;
      messageTelegram += `<b>Message: </b> ${message}\n\n`;
      messageTelegram += `<b>Time: </b> ${new Date().toLocaleString()}`;

      await axios
        .post(URI_API, {
          chat_id: process.env.REACT_APP_CHAT_ID,
          parse_mode: "html",
          text: messageTelegram,
        })
        .then((res) => {
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        })
        .catch((err) => {
          return toast.error("ERROR")
        })
        .finally(() => {
          return toast.success("Success!");
        });
    } else {
      return toast.error("Write to all");
    }
  };

  return (
    <div className={"container"}>
      <form className={classes.form}>
        <div className={classes.inputs}>
          <div className={classes.input}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required={true}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className={classes.input}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="subject">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required={true}
          ></textarea>
        </div>
        <button className={classes.button} onClick={SubmitHandler}>
          Let’s Talk
        </button>
      </form>
    </div>
  );
}
