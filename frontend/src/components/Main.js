import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onDeleteCardClick }) {
    const CurrentUserInfo = useContext(CurrentUserContext);
    const myUserId = CurrentUserInfo._id;

    return (
        <main className="content">
          <section className="profile">
              <div className="profile__container">
                  <div className="profile__main">
                      <div className="profile__avatar" onClick={onEditAvatar}>
                          <img className="profile__image" src={CurrentUserInfo.avatar} alt="Аватарка" />
                          <div className="profile__cursor"></div>
                      </div>
                      <div className="profile__info">
                          <div className="profile__window">
                              <h1 className="profile__name">{CurrentUserInfo.name}</h1>
                              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                          </div>
                          <p className="profile__subline">{CurrentUserInfo.about}</p>
                      </div>
                  </div>
                  <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
              </div>
          </section>
          <section className="cards">
              <ul className="cards__list">
                {cards.map(({ owner, likes, _id, name, link }) => (
                    <Card
                        isOwn = {myUserId === owner}
                        handleCardClick = {onCardClick}
                        key = {_id}
                        likes = {likes}
                        name = {name}
                        link = {link}
                        isLiked = {likes.some(element => element === myUserId)}
                        onCardLike = {onCardLike}
                        onDeleteCardClick = {onDeleteCardClick}
                        id = {_id}
                    />
                ))}
              </ul>
          </section>
        </main>
    );
}

export default Main;