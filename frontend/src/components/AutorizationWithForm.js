import { useState } from 'react';
import Header from "./Header.js";
import { NavLink } from 'react-router-dom';

function AutorizationWithForm({ title, link, linkTitle, buttonTitle, onSubmit }) {
    const [valueInputs, setValuesInput] = useState({});

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit(valueInputs.email, valueInputs.password);
    }

    function handleChangeInputs(evt) { 
        const { name, value } = evt.target;
        setValuesInput((previousValues) => ({ 
            ...previousValues, 
            [name]: value
        }));
    } 

    return (
        <>
            <Header>
                <NavLink to={`/${link}`} className="header__link">{linkTitle}</NavLink>
            </Header>
            <div className="autorization">
                <h2 className="autorization__title">{title}</h2>
                <form className='autorization__form' onSubmit={handleSubmit}>
                    <input
                        className = "autorization__input"
                        id = "autorization__email"
                        type = "email"
                        name = "email"
                        placeholder = "Email"
                        value = {valueInputs.email || ""}
                        onChange = {handleChangeInputs}
                        required
                    />
                    <input
                        className = "autorization__input"
                        id = "autorization__password"
                        type = "password"
                        name = "password"
                        placeholder = "Пароль"
                        minLength = "8"
                        maxLength = "40"
                        value = {valueInputs.password || ""} 
                        onChange = {handleChangeInputs}
                        required
                    />
                    <button className="autorization__button" type="submit" >{buttonTitle}</button>
                </form>
            </div>
        </>
    );
}

export default AutorizationWithForm;