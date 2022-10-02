import AutorizationWithForm from "./AutorizationWithForm.js";
import { NavLink } from 'react-router-dom';
import * as Auth from '../utils/Auth.js';

function Register({ onRegister }) {
    function handleSubmit(email, password) {
        onRegister(email, password);
    }

    return (
        <div className="page">
            <AutorizationWithForm
                title={'Регистрация'}
                link={'signin'}
                linkTitle={'Войти'}
                buttonTitle={'Зарегистрироваться'}
                onSubmit={handleSubmit}
            />
            <p className="autorization__register_subtitle">Уже зарегистрированы? <NavLink className="autorization__register_link" to='/signIn'>Войти</NavLink></p>
        </div>
    );
}

export default Register;