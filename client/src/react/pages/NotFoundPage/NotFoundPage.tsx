import { FC } from "react";
import { Link } from "react-router-dom";

import "./not_found.scss"
const NotFoundPage : FC = () => {
    return (
        <div className="not-found">
           <h1>Упс! Страница не найдена</h1>
           <p>
                <span>Такой страницы не существует или она была удалена</span>
                <span>Предлагем вернуться на главную</span>
           </p>
            <Link to="/home">Вернуться на главную</Link>
        </div>
    );
};

export default NotFoundPage;