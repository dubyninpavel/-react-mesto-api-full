function Card({ isOwn, handleCardClick, likes, name, link, isLiked, onCardLike, id, onDeleteCardClick }) {
    const cardDeleteButtonClassName = (
        `cards__delete-button ${ isOwn ? 'cards__delete-button_active' : ''}`
    );
    const isMyLike = (
        `cards__like ${ isLiked ? 'cards__like_active' : '' }`
    );
    
    function handleClick() {
        handleCardClick({ name, link });
    }
    
    function handleLikeClick() {
        onCardLike({ id, likes });
    }

    function handleDeleteClick() {
        onDeleteCardClick({ id });
    }

    return (
        <li className="cards__item">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <img className="cards__photo" src={link} alt={name} onClick={handleClick} />
            <div className="cards__container">
                <h2 className="cards__place">{name}</h2>
                <div className="cards__like-container">
                    <button className={isMyLike} onClick={handleLikeClick} type="button"></button>
                    <p className="cards__count-likes">{likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;