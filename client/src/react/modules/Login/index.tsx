import { FC } from "react";
import { Link } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Title from "../../UI/Title/Title";

import "./login.scss"
import Button from "../../UI/Button/Button";

const Login : FC = () => {
    return (
        <section className="login">
            <div className="login__wrapper">
                <Title className="login-title" title="Авторизация" />
                <form action="#" className="login__content">
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
                    <Button className="login__content-button" title="Войти"/>
                </form>
                <div className="login__navigation">
                    <Link to="/register">Нет аккаунта? Зарегистрируйтесь!</Link>
                </div>
            </div> 
        </section>
    )
}

export default Login;