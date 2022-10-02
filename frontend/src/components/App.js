import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import PageNotFound from './PageNotFound.js';
import * as Auth from '../utils/Auth.js';

function App() {
    const [ currentUser, setCurrentUser ] = useState({});
    const [ selectedCard, setSelectedCard ] = useState({});
    const [ selectedCardId, setSelectedCardId ] = useState({})
    const [ cards, setCards ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false);
    const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
    const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
    const [ isImagePopupOpen, setIsImagePopupOpen ] = useState(false);
    const [ isDeleteCardPopupOpen, setIsDeleteCardPopupOpen ] = useState(false);
    const [ infoTooltipRegister, setInfoTooltipRegister] = useState(false);
    const [ requestStatus, setRequestStatus ] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ dataEmail, setDataEmail ] = useState("");
    const [ windowWidth, setWindowWidth ] = useState("");
    const history = useHistory();
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [windowWidth]);

    useEffect(() => {
        if (loggedIn) {
            api.getDataUser()
                .then((dataUser) => {
                    setCurrentUser(dataUser);
                })
                .catch((err) => {
                    console.log(err);
                });
            api.getCards()
                .then((cards) => {
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (token){
                Auth.getContent(token)
                .then((res) => {
                    if (res){
                        setDataEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            } 
        }
    }, [loggedIn]);

    function handleLogin(email, password) {
        Auth.authorize({ email, password })
        .then((data) => {
            if (data.token){
                setLoggedIn(true);
                history.push('/');
            }  
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleRegister(email, password) {
        Auth.register({ email, password })
        .then((res) => {
            if (res) {
                infoTooltipRegisterOpen(true);
            } else {
                infoTooltipRegisterOpen(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function infoTooltipRegisterOpen(status) {
        setInfoTooltipRegister(!infoTooltipRegister);
        setRequestStatus(status);
    }

    function infoTooltipRegisterClose() {
        setInfoTooltipRegister(!infoTooltipRegister);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleOpenImageClick({ name , link }) {
        setSelectedCard({ 
            name,
            link
        })
        setIsImagePopupOpen(!isImagePopupOpen);
    }

    function handleCloseImage() {
        setIsImagePopupOpen(!isImagePopupOpen);
    }

    function handleDeleteCardClick({ id }) {
        setSelectedCardId({
            id
        });
        setIsDeleteCardPopupOpen(true);
    }
    
    function closeDeletePopup() {
        setIsDeleteCardPopupOpen(false);
    }

    function handleUpdateUser(dataUser) {
        setIsLoading(true);
        api.setDataUser(dataUser)
            .then((newDataUser) => {
                setCurrentUser(newDataUser);
                handleEditProfileClick();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    function handleUpdateAvatar(dataAvatar) {
        setIsLoading(true);
        api.updatePhotoProfile(dataAvatar)
            .then((newDataUser) => {
                setCurrentUser(newDataUser);
                handleEditAvatarClick();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardLike({ id, likes }) {
        const isLiked = likes.some(element => element._id === currentUser._id);
        if (!isLiked) {
            api.setLikeCard(id)
                .then((newCard) => {
                    setCards((state) => state.map((card) => card._id === id ? newCard : card));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.deleteLikeCard(id)
                .then((newCard) => {
                    setCards((state) => state.map((card) => card._id === id ? newCard : card));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleCardDelete() {
        setIsLoading(true);
        api.deleteCard(selectedCardId.id)
            .then(() => {
                setCards((state) => state.filter((card) => card._id !== selectedCardId.id));
                closeDeletePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddCard(dataCard) {
        setIsLoading(true);
        api.addNewCard(dataCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                handleAddPlaceClick();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function signOut(){
        localStorage.removeItem('token');
        history.push('/signin');
    }

    function handleMenu() {
        return (
            <div className="header__data">
                <p className="header__email">{dataEmail}</p>
                <button onClick={signOut} className="header__button">Выйти</button>
            </div>
        )
    }

    return (
        <Switch>
            <Route path="/signup">
                <Register
                    onRegister = {handleRegister}
                />
                <InfoTooltip
                    isOpen = {infoTooltipRegister}
                    onClose = {infoTooltipRegisterClose}
                    appellation = {'register'}
                    requestStatus = {requestStatus}
                    goodRequestText = "Вы успешно зарегистрировались!"
                    badRequestText = "Что-то пошло не так! Попробуйте ещё раз."
                />
            </Route>
            <Route path="/signin">
                <Login 
                    onLogin = {handleLogin}
                />
            </Route>
            <Route exact path="/">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                <CurrentUserContext.Provider value={currentUser}>
                    <div className="page">
                        <Header>
                            { windowWidth > 450 ? (
                                <div className="header__data">
                                    <p className="header__email">{dataEmail}</p>
                                    <button onClick={signOut} className="header__button">Выйти</button>
                                </div>
                                ) : (
                                    <button className="header__menu" onClick={handleMenu}>
                                        <hr className="header__line"></hr>
                                        <hr className="header__line"></hr>
                                        <hr className="header__line"></hr>
                                    </button>
                                )
                            }
                        </Header>
                        <Main
                            onEditAvatar = {handleEditAvatarClick}
                            onEditProfile = {handleEditProfileClick}
                            onAddPlace = {handleAddPlaceClick}
                            onCardClick = {handleOpenImageClick}
                            onDeleteCardClick = {handleDeleteCardClick}
                            onCardLike = {handleCardLike}
                            cards = {cards}
                        />
                        <Footer />
                        <EditAvatarPopup 
                            isOpen = {isEditAvatarPopupOpen}
                            onClose = {handleEditAvatarClick}
                            onUpdateAvatar = {handleUpdateAvatar}
                            isLoading = {isLoading}
                        />
                        <EditProfilePopup
                            isOpen = {isEditProfilePopupOpen}
                            onClose = {handleEditProfileClick}
                            onUpdateUser = {handleUpdateUser}
                            isLoading = {isLoading}
                        />
                        <AddPlacePopup 
                            isOpen = {isAddPlacePopupOpen}
                            onClose = {handleAddPlaceClick}
                            onAddCard = {handleAddCard}
                            isLoading = {isLoading}
                        />
                        <DeleteCardPopup
                            isOpen = {isDeleteCardPopupOpen}
                            onClose = {closeDeletePopup}
                            onCardDelete = {handleCardDelete}
                            isLoading = {isLoading}
                        />
                        <ImagePopup
                            isOpen = {isImagePopupOpen}
                            onClose = {handleCloseImage}
                            dataCard = {selectedCard}
                        />
                    </div>
                </CurrentUserContext.Provider>
            </Route>
            <Route path="*">
                <PageNotFound />
            </Route>
        </Switch>
    );
}

export default App;