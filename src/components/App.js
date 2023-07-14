import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import PageNotFound from './PageNotFound.js';
import Login from './Login.js';
import Register from './Register.js'
import InfoTooltip from './InfoTooltip.js'

// конекст с инфой пользователя
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  //стэйты состояний попаов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltip, setisInfoTooltip] = React.useState(false);
  // стейт картинки
  const [selectedCard, setSelectedCard] = React.useState({});
  //* стейт инфы о пользователе прокинем его в контекст
  const [currentUser, setCurrentUser] = React.useState({});
  // стейт с масивом карточек
  const [cards, setCards] = React.useState([]);
  //стейт который следит за авторизацией пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  // создает эфект при монтировании компанента
  React.useEffect(() => {
    Promise.all([api.getCardData(), api.getUserInfo()])
      .then(([cards, userInfo]) => {
        setCards(cards);
        // обновит стейт инф о пользователе
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        api.infoError(`Ошибка загрузки ины о пользователе с сервера`, err)
      })
  }, []);

  //функция открытия инфо окна
  function handleInfoTooltip() {
    setisInfoTooltip(true);
  };

  //редактирование аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  // радактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  // добавление новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // открытие попапа с большой картинкой карточки
  function handleCardClick(cardObject) {
    setSelectedCard(cardObject);
  };

  // закрывает попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisInfoTooltip(false);

    // стейт картинки
    setSelectedCard({});
  };

  // реализация снятия и поставки лайка на карточке
  function handleCardLike(card) {
    // проверяем наличие лайка
    const isLiked = card.likes.some((like) => {
      return like._id === currentUser._id;
    });

    //пробешается по массиву, если айди карточки с лайком совпадает с айди карточки из массива то заменяет ее новой, если нет, то вставляет текущий элемент
    const setStateCards = (cardId, card) => {
      setCards(() => {
        return cards.map((itemArr) => {
          return itemArr._id === cardId ? card : itemArr;
        })
      });
    };

    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch((err) => {
          api.infoError(`Лайк не поставлен`, err);
        })
    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch((err) => {
          api.infoError(`Лайк не удален`, err);
        })
    }
  };

  // функция удаления карточек
  function handleCardDelete(card) {
    // запрос к серверу на удаление карточки, которая попадает сюда через клик по кнопке
    api.deleteCard(card._id)
      .then(() => {
        setCards(() => {
          return cards.filter((i) => {
            return i._id !== card._id;
          })
        });
      })
      .catch((err) => {
        api.infoError(`Карточка не удалена`, err);
      });
  };

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((newUserInfo) => {
        // обновляем стейт переменную с инфой о пользователе и закрываем все модалки
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        api.infoError(`Информация о пользователе не изменена`, err);
      })
  };

  // функция обновления аватарки
  function handleUpdateAvatar(avatar) {
    api.newAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        api.infoError('аватарка не обнавлена', err);
      });
  };

  // создание новой карточки
  function handleAddPlaceSubmit(card) {
    api.setCardUser(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        api.infoError('Карточка не добавлена', err);
      });
  };

  return (
    <>
      {/* контекст с инфой пользователя  */}
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path='/' element={<ProtectedRoute element={Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />}></Route>
          <Route path='/sign-in' element={<Login loggedIn={loggedIn} />}></Route>
          <Route path='/sign-up' element={<Register loggedIn={loggedIn} />}></Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        {/* <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} /> */}
        {loggedIn && <Footer />}

        <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm title="Вы уверены?" name="confirmation" buttonText="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
