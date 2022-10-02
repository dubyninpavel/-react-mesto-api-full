import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup({ isOpen, onClose, onCardDelete, isLoading }) {
    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete();
    }

    return (
        <PopupWithForm
            appellation = "delete-card"
            title = "Вы уверены?"
            buttonSubmit = { isLoading ? "Удаление..." : "Да" }
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
        />
    );
}

export default DeleteCardPopup;