function ImagePopup({ isOpen, onClose, dataCard }) {
    return (
        <div className={`popup popup_photo ${ isOpen ? "popup_is-active" : "" }`}>
            <div className="popup__container">
                <img className="popup__image" src={dataCard.link} alt={dataCard.name} />
                <button className="popup__close" type="button" onClick={onClose}></button>
                <p className="popup__text">{dataCard.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;