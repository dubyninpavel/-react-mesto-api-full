import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {
    const [ name, setName ] = useState("");
    const [ link, setLink ] = useState("");

    function handleNameInput(evt) {
        setName(evt.target.value);
    }

    function handleLinkInput(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddCard({
            name,
            link
        });
    }
    
    useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            appellation = "add-cards"
            title = "Новое место"
            buttonSubmit = { isLoading ? "Создание..." : "Создать" }
        >
            <input
                className = "popup__input popup__name"
                id = "popup__cardName"
                type = "text"
                name = "name"
                placeholder = "Название"
                minLength = "2"
                maxLength = "30"
                onChange = {handleNameInput}
                value = {name || ""} 
                required
            />
            <span className = "popup__input-error popup__cardName-error"></span>
            <input
                className = "popup__input popup__subline"
                id = "popup__cardLink"
                type = "url"
                name = "link"
                placeholder = "Ссылка на картинку"
                onChange = {handleLinkInput}
                value = {link || ""}
                required
            />
            <span className="popup__input-error popup__cardLink-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;