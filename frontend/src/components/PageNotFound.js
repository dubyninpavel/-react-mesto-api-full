import { NavLink } from 'react-router-dom';

function PageNotFound() {
    return (
        <div class="page">
            <div className="notfound">
                <h3 className="notfound__title">
                    <span>404</span> - Страница не найдена
                </h3>
                <p className="notfound__text">Ой, здесь ничего нет</p>
                <NavLink className="notfound_to-main" to="/">Назад</NavLink>
            </div>
        </div>
    );
}

export default PageNotFound;