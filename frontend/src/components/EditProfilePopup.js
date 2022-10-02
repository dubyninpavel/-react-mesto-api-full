import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const CurrentUserInfo = useContext(CurrentUserContext);

    function handleNameInput(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionInput(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(CurrentUserInfo.name);
        setDescription(CurrentUserInfo.about);
    }, [ CurrentUserInfo, isOpen ]);

    return (
        <PopupWithForm
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            appellation = "edit-profile"
            title = "Редактировать профиль"
            buttonSubmit = { isLoading ? "Сохранение..." : "Сохранить" }
        >
            <input
                className = "popup__input popup__name"
                id = "popup__profileName"
                type = "text"
                name = "name"
                placeholder = "Ваше имя"
                minLength = "2"
                maxLength = "40"
                onChange = {handleNameInput}
                value = {name || ""} 
                required
            />
            <span className = "popup__input-error popup__profileName-error"></span>
            <input
                className = "popup__input popup__subline"
                id = "popup__profileSubline"
                type = "text"
                name = "about"
                placeholder = "Чем занимаетесь?"
                minLength = "2"
                maxLength = "200"
                onChange = {handleDescriptionInput}
                value = {description || ""}
                required
            />
            <span className = "popup__input-error popup__profileSubline-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;