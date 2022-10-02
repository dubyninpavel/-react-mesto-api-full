function PopupWithForm({ isOpen, onClose, onSubmit, appellation, title, children, buttonSubmit }) {
    return (
        <div className={`popup popup_type_${appellation} ${ isOpen ? "popup_is-active" : "" }`} onClick={onClose}>
            <div className={`popup__content popup__content_${appellation}`} onClick={evt => evt.stopPropagation()}>
                <button className="popup__close" type="button" onClick={onClose}></button>
                <h2 className="popup__heading">{title}</h2>
                <form className="popup__form" name={appellation} onSubmit={onSubmit}>
                    <fieldset className="popup__fieldset">
                        {children}
                        <button className="popup__button popup__save" type="submit">{buttonSubmit}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;