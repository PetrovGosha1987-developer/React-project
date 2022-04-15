const onResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
}

const onError = (err) => {
    alert("Что-то пошло не так!");
}
class Api {
    constructor({ baseUrl, token }) {
        this._baseUrl = baseUrl;
        this._token = `Bearer ${token}`;
    }
    // получение всех постов
    getAllPosts() {
        return fetch(`${this._baseUrl}/posts`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
            .catch(onError)
    }
    // получение поста по id
    getPostById(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
            .catch(onError)
    }
    // создание нового поста
    createNewPost(userData) {
        return fetch(`${this._baseUrl}/posts`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        }).then(onResponse)
            .catch(onError)
    }
    //удаление поста по id
    deletePostById(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
            .catch(onError)
    }
    // установка/снятие лайка по id
    changeLikeStatus(postId, isLike) {
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
    }
    // получение информации о пользователе по токену в заголовках
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
    }
    // изменение avatar
    changeAvatar() {
        return fetch(`${this._baseUrl}/posts/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
    }

    // получение всех комментариев
    getAllComments() {
        return fetch(`${this._baseUrl}/posts/comments/`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
            .catch(onError)
    }
    // получение комментариев конкретного поста
    getCommentById(postId) {
        return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
            .catch(onError)
    }

}

const config = {
	baseUrl: 'https://api.react-learning.ru',
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiZGQiLCJpYXQiOjE2NDcwMTM4ODgsImV4cCI6MTY3ODU0OTg4OH0._V49e-M4KrDv0STcJsLUGnvFxrkXf4cprNVtn9n2RLU',
}

const api = new Api(config);

export default api;