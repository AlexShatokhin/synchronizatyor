import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Title from "../../UI/Title/Title";

import "./login.scss"
import Button from "../../UI/Button/Button";
import useHttp from "../../hooks/useHttp";


const Login : FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const {fetchData, loading} = useHttp();
    const navigate = useNavigate();

    const handleLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        let errorMessage = "";

        if (!email.includes('@')) {
            errorMessage = "Некорректный email";
        } else if (password.length < 6) {
            errorMessage = "Пароль должен содержать не менее 6 символов";
        } else {
            userAuth();
        }

        setError(errorMessage);
    }

    const userAuth = async () => {
        const data = {
            email, 
            password
        }
        fetchData("http://localhost:4000/api/login", "POST", JSON.stringify(data))
        .then(() => {
            setError("");
            navigate("/logs");
            console.log("Успешная авторизация")
        })
        .catch(() => setError("Ошибка авторизации"))
    }

    return (
        <section className="login">
            <div className="login__wrapper">
                <Title className="login-title" title="Авторизация" />
                <form action="#" className="login__content">
                    <div className="login__inputs">
                        <Input
                            placeholder="Введите почту"
                            type="text" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="login__inputs-item" />

                        <Input
                            placeholder="Введите пароль"
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login__inputs-item" />
                    </div>
                    <div className="error-message">
                    {error && <div className="login__error">{error}</div>}                    </div>
                    <Button onClick={handleLogin} className="login__content-button" title="Войти"/>
                </form>
                <div className="login__navigation">
                    <Link to="/register">Нет аккаунта? Зарегистрируйтесь!</Link>
                </div>
            </div> 
        </section>
    )
}

export default Login;