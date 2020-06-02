'use strict';
export default class Api {
    constructor(token, url) {
        this.token = token;
        this.url = url;
    }
    getInfo() {
        return new Promise((resolve) => fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this.token
            }
        })
            .then(res => {
                if (res.ok) {
                return res.json()
            }
                return Promise.reject(`Ошибка:${res.status}`)
            })
            .then(res => resolve(res))
            .catch((err => console.log(err))))
    }
   getInitialCard() {
        return new Promise((resolve) => fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.token
            }
        })
            .then(res => {if(res.ok) {
                return res.json()
            }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .then(res => resolve(res))
            .catch(err => console.log(err)))
    }
    updateInfo(name, about, avatar, avatarLink) {
        return new Promise((resolve) => fetch(`${this.url}/users/me/${avatar}`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`,
                avatar: `${avatarLink}`
            })
        })
            .then(res => {if (res.ok) {
                return res.json()
            }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .then(res => resolve(res))
            .catch(err => console.log(err)));
    }
    postNewCard(name, link) {
        return new Promise((resolve) => fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                    name: `${name}`,
                    link: `${link}`,
                }
            )
        })
            .then(res => {if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
            })
            .then(res => resolve(res))
            .catch(err => console.log(err)));
    }
    delete(id, like) {
        return new Promise((resolve) => fetch(`${this.url}/cards/${like}/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            }
        })
            .then(res => {if (res.ok) {
                return res.json();
            }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .then(res => resolve(res))
            .catch(err => console.log(err)));
    }
    put(id, like) {
        return new Promise((resolve) => fetch(`${this.url}/cards/${like}/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this.token,
            }
        })
            .then(res => {if (res.ok) {
                return res.json();
            }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .then(res => resolve(res))
            .catch(err => console.log(err)));
    }
}
