import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const inputAvatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: inputAvatarRef.current.value
        });
    }

    useEffect(() => {
        inputAvatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            appellation = "avatar"
            title = "Обновить аватар"
            buttonSubmit = { isLoading ? "Сохранение..." : "Сохранить" }
        >
            <input
                className = "popup__input popup__subline"
                id = "popup__avatarLink"
                type = "url" 
                name = "avatar" 
                placeholder = "Ссылка на картинку" 
                ref = {inputAvatarRef}
                required
            />
            <span className = "popup__input-error popup__avatarLink-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;