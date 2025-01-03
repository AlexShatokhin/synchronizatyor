import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useRedux";
import Input from "../../UI/Input/Input";
import Title from "../../UI/Title/Title";
import Spinner from "../../UI/Spinner/Spinner";

import "./login.scss"
import Button from "../../UI/Button/Button";
import useHttp from "../../hooks/useHttp";
import { login } from "../../slice/userSlice";
import { changeActiveElement } from "../NavigationMenu/slice/NavigationMenuSlice";
import { HOST, PORT } from "../../../constants/port";


const Login : FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const dispatch = useTypedDispatch();
    const {fetchData, loading} = useHttp();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            navigate("/logs");
        }
    }, [navigate]);

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
        fetchData(`http://${HOST}:${PORT}/api/login`, "POST", JSON.stringify(data))
        .then((res) => {
            setError("");
            dispatch(login(res.user));
            navigate("/home");
            dispatch(changeActiveElement("home"));
        })
        .catch(() => setError("Неверный логин или пароль"))
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
                        {error && <div className="login__error">{error}</div>}                    
                    </div>
                    <Button onClick={handleLogin} className="login__content-button" title={loading ? <Spinner /> : "Войти"}/>
                </form>
                <div className="login__navigation">
                    <Link to="/register">Нет аккаунта? Зарегистрируйтесь!</Link>
                </div>
            </div> 
        </section>
    )
}

export default Login;