import { FC } from "react";
import { Link } from "react-router-dom";
import BadgeStatus from "../../UI/BadgeStatus/BadgeStatus";
import { SynchronizationStatusEnum } from "../../types/SynchronizationStatusEnum";

import { IoChevronBack } from "react-icons/io5";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Title from "../../UI/Title/Title";

import "./registration.scss";
import { colors } from "../../../constants/colors";

const Registration : FC = () => {
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
                            placeholder="Введите логин"
                            type="text"  
                            className="login__inputs-item" />
                        <Input 
                            placeholder="Введите пароль"
                            type="password" 
                            className="login__inputs-item" />
                    </div>
                    <div className="login__statuses">
                        <BadgeStatus 
                            status={SynchronizationStatusEnum.PENDING}
                            showText
                            text="Пароль должен содержать минимум 8 символов"/>
                        <BadgeStatus 
                            status={SynchronizationStatusEnum.PENDING}
                            showText
                            text="Пароль должен содержать"/>
                        <BadgeStatus 
                            status={SynchronizationStatusEnum.PENDING}
                            showText
                            text="Пароль должен "/>
                    </div>
                    <Button className="login__content-button" title="Войти"/>
                </form>
            </div> 
        </section>
    )
}

export default Registration;