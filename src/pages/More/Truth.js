import React from 'react'
import Currency from '../../components/Currency/Currency'
import classes from "./Truth.module.css"
import NameLength from "../../components/NameLength/NameLength"
import translate from "../../components/translate/translate"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import firebase from "../../firebase";
import axios from 'axios'

function Truth({
    setTruth,
    productMore, user }) {
    const navigate = useNavigate()

    const [phoneNumberAdd, setPhoneNumberAdd] = useState(false)
    const [value, setValue] = useState("");
    const [loadingGif, setLoadingGif] = useState(false)
    const [trueFalse, SetTrueFalse] = useState(false);
    const [codeButton, setCodeButton] = useState(true)
    const [code, setCode] = useState("")

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

    const SubmitHandler = async (e) => {
        if (value.length > 10) {
            const phoneNumber = value;
            configureCaptcha();
            setLoadingGif(true)
            const appVerifier = window.recaptchaVerifier;
            firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    SetTrueFalse(true);
                    setLoadingGif(false)
                    setCodeButton(false)
                    return (window.confirmationResult = confirmationResult);
                })
                .catch((error) => {
                    setLoadingGif(false)
                    return SetTrueFalse(false);
                });
        } else {
            return toast.error(translate("Введите номер правильно", "Nomerni tog'ri kiriting"));
        }
    };

    const ProfileNumberUpdate = async (user1) => {
        await axios.put(`${process.env.REACT_APP_URL}/add/profile/updateNumber/${user._id}`, {
            phoneNumber: user1,
        })
            .then(res => {
                localStorage.setItem('profileNumber', user1);
                BtnYes()
                return toast.success("✔!")
            })
            .catch(err => {
                return toast.error(translate("Неправильно!", "xato!"));
            })
    }

    const CodeSubmit = async (e) => {
        e.preventDefault();
        if (code) {
            if (code.length > 5) {
                const code1 = code;
                window.confirmationResult
                    .confirm(code1)
                    .then((result) => {
                        const user1 = result.user.phoneNumber;
                        ProfileNumberUpdate(user1)
                    })
                    .catch((error) => {
                        return toast.error(translate("Неправильный код!", "Kod xato!"));
                    });
            } else {
                return toast.error(translate("Введите правильный код", "Kodni to'gri kiriting"));
            }
        } else {
            return toast.error(translate("Введите правильный код", "Kodni to'gri kiriting"));
        }
    }
    const SubmitTelegram = async (e) => {
        const URI_API = `https://api.telegram.org/bot${process.env.REACT_APP_TOKEN}/sendMessage`;
        let message = `<b>#BestShop #Shopping_Time</b>\n\n`;
        message += `<b>User:</b>\n`;
        message += ` <b> User Profile Number: </b> <strong>${localStorage.getItem("profileNumber") ? localStorage.getItem("profileNumber") : user.phoneNumber}</strong>\n`;
        if (user._id) {
            message += ` <b> User ID: </b> <strong>${user._id}</strong>\n`;
        }
        if (user.firstName) {
            message += ` <b> User FirstName: </b> ${user.firstName}\n`;
        }
        if (user.lastName) {
            message += ` <b> User LastName: </b> ${user.lastName}\n`;
        }
        if (user.googleId) {
            message += ` <b> User GoogleID: </b> ${user.googleId}\n`;
        }
        if (user.fullName) {
            message += ` <b> User fullName: </b> ${user.fullName}\n`;
        }
        if (user.avatar) {
            message += ` <b> User Avatar: </b> ${user.avatar}\n`;
        }

        message += `\n<b>Product:</b>\n`;
        message += ` <b> Product ID: </b> <strong>${productMore._id}</strong>\n`;
        message += ` <b> Product Name: </b> ${productMore.name_uz} \n`;
        message += ` <b> Product Price: </b> ${Currency(productMore.price)} \n`;
        message += ` <b> Product Desc: </b> ${NameLength(productMore.desc_uz, 150)}\n\n`;

        message += `<b> Time: </b> ${new Date().toLocaleString()} `;

        await axios
            .post(URI_API, {
                chat_id: process.env.REACT_APP_CHAT_ID,
                parse_mode: "html",
                text: message,
            })
            .then((res) => {
                // setInput("");
                return toast.success("Administratorga yuborildi!")

            })
            .catch((err) => {
                console.log(err);
                return toast.error("Xatolik bor!")
            })
            .finally(() => {
                return
            });
        setTruth(false)
    }

    const BtnYes = (e) => {
        if (user !== null) {
            user.phoneNumber || localStorage.getItem("profileNumber") ? (
                SubmitTelegram()
            ) : (
                setPhoneNumberAdd(true)
            )
        } else {
            navigate("/login")
        }
    }

    return (
        <div className={classes.Truth}>
            {phoneNumberAdd
                ?
                <div>
                    <label htmlFor='phoneNumber'>{translate("Введите свой номер телефона", "Telefon raqamingizni kiriting")}</label>
                    <div>
                        <PhoneInput
                            international
                            defaultCountry="UZ"
                            className="input"
                            placeholder={translate("Введите свой номер телефона", "Telefon raqamingizni kiriting")}
                            value={value}
                            onChange={setValue}
                        />
                        {trueFalse ? (
                            <>
                                <label htmlFor="smsCode" style={{ fontSize: "13px" }}>{translate("Введите код!", "Kodni kiriting!")}</label>
                                <input type="text" name="" id="smsCode" placeholder={translate("Введите код!", "Kodni kiriting!")} value={code} onChange={(e) => setCode(e.target.value)} style={{ marginBottom: "15px", width: "200px" }} />
                            </>
                        ) : ""}
                        <button className={classes.SubmitCode}
                            onClick={codeButton ? SubmitHandler : CodeSubmit}
                        >
                            {loadingGif ? <img src="/uploads/loading_gif.gif" alt="" /> : <>{translate("Отправить", "Yuborish")} </>}
                        </button>
                    </div>
                </div> : (
                    <>
                        <div className={classes.AboutProduct}>
                            <h3><span>{translate("Имя:", "Nomi:")} </span>{translate(productMore.name_ru, productMore.name_uz)}</h3>
                            <h4><span>{translate("Цена:", "Narxi:")} </span>{Currency(productMore.price)}</h4>
                            <p><span> {translate("О продукте:", "Product haqida:")} </span>{translate(NameLength(productMore.desc_ru, 150), NameLength(productMore.desc_uz, 150))}</p>
                        </div>

                        <div className={classes.buttons}>
                            <span>{translate("Хотеть купить?", "Sotib olmoqchimisiz?")}</span>
                            <button className={classes.yes} onClick={(e) => {
                                BtnYes()
                            }}>{translate("ДА", "HA")}</button>
                            <button onClick={(e) => {
                                setTruth(false)
                            }}>{translate("Нет", "YO'Q")}</button>
                        </div>
                    </>
                )
            }

            <div id="sign-in-button" className={classes.signInOTP}></div>
        </div>
    )
}

export default Truth