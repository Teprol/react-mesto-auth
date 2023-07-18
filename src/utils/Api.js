class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    this._authorization = data.headers.authorization;
  }

  //при ошибке выводит в консоль посвеченную надпись об ошибке
  getInfoError = (err, errInf) => {
    console.log(
      `%c${err}`,
      `color: red; font-size: 24px; background-color: black; padding: 3px; text-align: center;`
    );
    console.error(errInf);
  };

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  };

  getCardData = () => {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  };

  getUserInfo = () => {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  };

  setUserInfo = ({ name, about }) => {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  };

  setCardUser = ({ name, link }) => {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse);
  };

  deleteCard = (idCard) => {
    return fetch(this._baseUrl + '/cards/' + idCard, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  addLike = (idCard) => {
    return fetch(this._baseUrl + '/cards/' + idCard + '/likes', {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  removeLike = (idCard) => {
    return fetch(this._baseUrl + '/cards/' + idCard + '/likes', {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  newAvatar = ({ avatar }) => {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(this._checkResponse);
  };
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'aa1ee32f-1c0f-4889-af2b-f7e1de805230',
    'Content-Type': 'application/json'
  }
})
