import goodRequestPhoto from '../images/good-request.jpg';
import badRequestPhoto from '../images/bad-request.jpg';
import { useHistory } from 'react-router-dom';

function InfoTooltip({ isOpen, onClose, appellation, requestStatus, goodRequestText, badRequestText }) {
    const historyRegister = useHistory();

    function handleClose() {
        onClose();
        if (requestStatus) {
            historyRegister.push('/signin');
        }
    }

    return (
        <div className={`popup popup_type_${appellation} ${ isOpen ? "popup_is-active" : "" }`} onClick={onClose}>
            <div className={`popup__content popup__content_${appellation}`} onClick={evt => evt.stopPropagation()}>
                <button className="popup__close" type="button" onClick={handleClose}></button>
                <img className="tooltip__image" src={requestStatus ? goodRequestPhoto : badRequestPhoto} />
                <p className="tooltip__subtitle">{ requestStatus ? goodRequestText : badRequestText }</p>
            </div>
        </div>
    );
}

export default InfoTooltip;