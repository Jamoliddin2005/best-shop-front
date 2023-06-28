import React, { useState } from "react";
import Google from "../img/google.png";
import Github from "../img/github.png";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import firebase from "../../firebase";
import "./Login.css";
import axios from "axios";

const Login = ({ GetToken }) => {
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [trueFalse, SetTrueFalse] = useState(false);
  const [accountCode, SetAccountCode] = useState(false);
  const [switcher, SetSwitcher] = useState(false);
  const [password, SetPassword] = useState("");
  const [account, setAccount] = useState("");
  const [passwordNumber, setPasswordNumber] = useState("");
  const [accountPassword, setAccountPassword] = useState(false);
  const [LoadingButton, setLoadingButton] = useState(false);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          SubmitHandler();
        },
      }
    );
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    if (code) {
      if (code.length > 5) {
        const code1 = code;
        window.confirmationResult
          .confirm(code1)
          .then((result) => {
            const user = result.user.phoneNumber;
            SetAccountCode(true);
            setAccount(user);
            setLoadingButton(false);
          })
          .catch((error) => {
            setLoadingButton(false);
            return toast.error("Kod xato!!!");
          });
      } else {
        setLoadingButton(false);
        return toast.error("Kodni to'gri kiriting");
      }
    } else {
      setLoadingButton(false);
      return toast.error("Kodni to'gri kiriting");
    }
  };
  const SubmitCode = async (req, res) => {
    if (password !== "") {
      if (password.length > 5) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/auth/registerNumber`,
          {
            phoneNumber: account,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        if (data.data) {
          window.sessionStorage.setItem("token", data.data);
          GetToken();
          return;
        }

        return toast.success("Success");
      } else {
        return toast.error("Parol juda qisqa");
      }
    } else {
      return toast.error("Parol juda qisqa");
    }
  };
  const google = () => {
    return window.open(`${process.env.REACT_APP_URL}/auth/google`, "_self");
  };
  const github = () => {
    return window.open(`${process.env.REACT_APP_URL}/auth/github`, "_self");
  };

  const SubmitHandler = async (e) => {
    setLoadingButton(true);
    if (value.length > 10) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/auth/userFind`,
        {
          phoneNumber: value,
        }
      );
      if (data.data) {
        const phoneNumber = value;
        configureCaptcha();
        const appVerifier = window.recaptchaVerifier;

        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            SetTrueFalse(true);
            setLoadingButton(false);
            return (window.confirmationResult = confirmationResult);
          })
          .catch((error) => {
            return SetTrueFalse(false);
          });
      } else {
        return setAccountPassword(true);
      }
    } else {
      return toast.error("Nomerni tog'ri kiriting");
    }
  };

  const AccountPasswordSubmitHandler = async (req, res) => {
    setLoadingButton(true);
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/auth/PostPasswordSubmit`,
      { phoneNumber: value, password: passwordNumber },
      {
        withCredentials: true,
      }
    );
    if (data.success) {
      setLoadingButton(false);
      window.sessionStorage.setItem("token", data.data);
      GetToken();
      return;
    } else {
      return toast.error("Password is Incorrect");
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="loginTitle">Login Page</h1>
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <PhoneInput
            international
            defaultCountry="UZ"
            className="input"
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
          />
          {accountPassword ? (
            <>
              <div className="inputsLoginPass">
                <input
                  className={"input accountPass"}
                  placeholder="Password"
                  value={passwordNumber}
                  minLength={6}
                  type={switcher ? "text" : "password"}
                  onChange={(e) => setPasswordNumber(e.target.value)}
                />
                <div className="switcher">
                  {switcher ? (
                    <div
                      className="on"
                      onClick={() => {
                        SetSwitcher(false);
                      }}
                    >
                      <span role="img" aria-label="monkey">
                        🙈
                      </span>
                    </div>
                  ) : (
                    <div
                      className="off"
                      onClick={() => {
                        SetSwitcher(true);
                      }}
                    >
                      <span role="img" aria-label="monkey">
                        🐵
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {LoadingButton ? (
                <button className="submit" disabled={true}>Loading...</button>
              ) : (
                <button
                  className="submit"
                  onClick={AccountPasswordSubmitHandler}
                >
                  Login
                </button>
              )}
            </>
          ) : (
            <>
              {trueFalse ? (
                <>
                  {accountCode ? (
                    <>
                      <div className="inputsLoginPass">
                        <input
                          className={"input"}
                          placeholder="Create Password"
                          value={password}
                          minLength={6}
                          type={switcher ? "text" : "password"}
                          onChange={(e) => SetPassword(e.target.value)}
                        />
                        <div className="switcher">
                          {switcher ? (
                            <div
                              className="on"
                              onClick={() => {
                                SetSwitcher(false);
                              }}
                            >
                              <span role="img" aria-label="monkey">
                                🙈
                              </span>
                            </div>
                          ) : (
                            <div
                              className="off"
                              onClick={() => {
                                SetSwitcher(true);
                              }}
                            >
                              <span role="img" aria-label="monkey">
                                🐵
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    LoadingButton ? (
                      <button className="submit" disabled={true}>Loading...</button>
                    ) : (
                      <>
                      <input
                        className="input codeSubmit"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      /> 
                      <button className="submit" onClick={onSubmitOTP}>
                        Login
                      </button>
                    </>
                    )                  
                  )}
                </>
              ) : LoadingButton ? (
                <button className="submit" disabled={true}>Loading...</button>
              ) : (
                <button className="submit" onClick={SubmitHandler}>
                  Login
                </button>
              )}
            </>
          )}
          <div id="sign-in-button"></div>

          {accountCode ? (
            <button className="submit codeAccountBtn" onClick={SubmitCode}>
              Code Account
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
