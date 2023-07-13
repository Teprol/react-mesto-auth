import { token, cohort } from "./utils.js";

class Api {
  constructor(cohortId, token) {
    this._cohortId = cohortId;
    this._token = token;
  }

  //при ошибке выводит в консоль посвеченную надпись об ошибке
  infoError = (err, errInf) => {
    console.log(
      `%c${err}`,
      `color: red; font-size: 24px; background-color: black; padding: 3px; text-align: center;`
    );
    console.error(errInf);
  };

  getCardData = () => {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: `${this._token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  };

  getUserInfo = () => {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: `${this._token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  };

  setUserInfo = ({ name, about }) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  };

  setCardUser = ({ name, link }) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  };

  deleteCard = (idCard) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(idCard);
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  addLike = (idCard) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(idCard);
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  removeLike = (idCard) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(idCard);
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  newAvatar = ({ avatar }) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  };
}

export const api = new Api(cohort, token);
