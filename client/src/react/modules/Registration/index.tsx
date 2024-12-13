import { FC, useState } from "react";
import { Link } from "react-router-dom";
import BadgeStatus from "../../UI/BadgeStatus/BadgeStatus";
import { SynchronizationStatusEnum } from "../../types/SynchronizationStatusEnum";

import useHttp from "../../hooks/useHttp";

import { IoChevronBack } from "react-icons/io5";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Title from "../../UI/Title/Title";

import "./registration.scss";
import { colors } from "../../../constants/colors";
import Spinner from "../../UI/Spinner/Spinner";

const Registration : FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validationChecks, setValidationChecks] = useState<boolean[]>([false, false, false, false, false]);
    const [registrationStatus, setRegistrationStatus] = useState<"complete" | "fail" | "idle">("idle");
    const {fetchData, loading} = useHttp();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const newValidationChecks = validationChecks;
        newValidationChecks[3] = e.target.value.includes('@');
        setValidationChecks(newValidationChecks);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        const newValidationChecks = validationChecks;
        newValidationChecks[4] = e.target.value.length > 0;
        setValidationChecks(newValidationChecks);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        const newValidationChecks = []
        newValidationChecks[0] = e.target.value.length >= 6;
        newValidationChecks[1] = /[A-Z]/.test(e.target.value);
        newValidationChecks[2] = /\d/.test(e.target.value);
        newValidationChecks[3] = validationChecks[3];
        newValidationChecks[4] = validationChecks[4];
        setValidationChecks(newValidationChecks);
    }

    const handleRegistration = (e : React.MouseEvent) => {
        e.preventDefault();
        const data = {
            email,
            name,
            password
        }
        fetchData("http://localhost:4000/api/register", "POST", JSON.stringify(data))
        .then(() => {
            setRegistrationStatus("complete");
        })
        .catch(() => setRegistrationStatus("fail"));
    }

    return (
        <section className="login">
            <div className="registration__navigation">
                <Link to="/"><IoChevronBack size={30} color={colors.blue}/> <span>Назад</span></Link>
            </div>
            <div className="login__wrapper">
                <Title title="Регистрация"/>
                <form action="" className="login__content">
                    <div className="login__inputs">
                        <Input
                            placeholder="Введите имя"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="login__inputs-item" />
                        <Input
                            placeholder="Введите почту"
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            className="login__inputs-item" />
                        <Input 
                            placeholder="Введите пароль"
                            type="password" 
                            value={password}
                            onChange={handlePasswordChange}
                            className="login__inputs-item" />
                    </div>
                    <div className="login__statuses">
                        <BadgeStatus 
                            status={validationChecks[4] ? SynchronizationStatusEnum.COMPLETE : SynchronizationStatusEnum.FAIL}
                            showText
                            text="Имя должно существовать"/>
                        <BadgeStatus 
                            status={validationChecks[3] ? SynchronizationStatusEnum.COMPLETE : SynchronizationStatusEnum.FAIL}
                            showText
                            text="Почта содержит @"/>
                        <BadgeStatus 
                            status={validationChecks[0] ? SynchronizationStatusEnum.COMPLETE : SynchronizationStatusEnum.FAIL}
                            showText
                            text="Пароль содержит не менее 6 символов"/>
                        <BadgeStatus 
                            status={validationChecks[1] ? SynchronizationStatusEnum.COMPLETE : SynchronizationStatusEnum.FAIL}
                            showText
                            text="Пароль содержит большую букву A-Z"/>
                        <BadgeStatus 
                            status={validationChecks[2] ? SynchronizationStatusEnum.COMPLETE : SynchronizationStatusEnum.FAIL}
                            showText
                            text="Пароль содержит цифры 0-9"/>
                    </div>
                    <Button 
                        onClick={handleRegistration} 
                        disabled = {!validationChecks.every(item => item)} 
                        className="login__content-button" 
                        title={loading ? <Spinner /> : "Регистрация"}/>
                    {registrationStatus === "complete" && <div className="login__status login__status-complete">Регистрация прошла успешно</div>}
                    {registrationStatus === "fail" && <div className="login__status login__status-fail">Ошибка регистрации</div>}
                </form>
            </div> 
        </section>
    )
}

export default Registration;