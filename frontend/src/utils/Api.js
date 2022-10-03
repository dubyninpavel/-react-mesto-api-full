class Api {
    constructor(url) {
        this.url = url;
        this.headers = {
            'Content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
        };
    }

    _getPromiseResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Возникла ошибка');
    }

    getAllData() {
        return Promise.all([this.getDataUser(), this.getCards()]);
    }

    getCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                authorization: this.getToken(),
            },
        })
        .then((res) => {
            return this._getPromiseResult(res);
        });
    }

    getDataUser() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                authorization: this.getToken(),
            },
        })
        .then((res) => {
            return this._getPromiseResult(res);
        })
    }

    setDataUser(data) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                authorization: this.getToken(),
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then((res) => {
            return this._getPromiseResult(res);
        })
    }

    addNewCard(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                authorization: this.getToken(),
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then((res) => {
            return this._getPromiseResult(res);
        })
    }

    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                authorization: this.getToken(),
            },
        })
        .then((res) => {
            return this._getPromiseResult(res);
        })
    }

    setLikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                authorization: this.getToken(),
            },
        })
        .then((res) => {
            return this._getPromiseResult(res);
        })
    }

    deleteLikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                authorization: this.getToken(),
            },
        })
        .then((res) => {
            return this._getPromiseResult(res);
        })
    }

    updatePhotoProfile(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                authorization: this.getToken(),
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then((res) => {
            return this._getPromiseResult(res);
        })
    }

    getToken(){
        return `Bearer ${localStorage.getItem('token')}`;
    }
}

const dataUser = new Api('https://api.project.mesto.russia.nomoredomains.icu');

export default dataUser;