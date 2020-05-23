'use strict';
class Card {
  constructor(name, link, likes, id, cardId, likeMassive) {
    this.oneCard = this.create(name, link, likes, id, cardId, likeMassive);
    this._setEventListeners();
  }

  get element() {
    return this.oneCard

  }

  _like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      const like = event.target.closest('.place-card');

      event.target.classList.toggle('place-card__like-icon_liked');
      if (event.target.classList.contains("place-card__like-icon_liked")) {
        infoApi.put(like.id, "like")
            .then(res => {
              like.querySelector('.place-card__like-amount').textContent = `${res.likes.length}`;
            });
      } else {
        infoApi.delete(like.id, "like")
            .then(res => {
              like.querySelector('.place-card__like-amount').textContent = `${res.likes.length}`;
            })
      }
    }
  }

  _remove(event) {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
    if (event.target.closest('.place-card__delete-icon')) {
      const del = event.target.closest('.place-card');
      event.target.removeEventListener('click', this._like);
      event.target.removeEventListener('click', this._remove);
      del.remove();
      infoApi.delete(del.id, "");
    }
    }
  }

  create(name, link, likes, id, cardId, likeMassive) {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');
    placeCard.id = `${cardId}`;
    const html = `<div data-url="${link}" class="place-card__image" style="background-image: url(${link})">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name">${name}</h3>
      <div class="place-card__group">
      <button class="place-card__like-icon"></button>
      <p class="place-card__like-amount">${likes}</p>
      </div>
    </div>`;

    placeCard.insertAdjacentHTML("afterbegin", html);
    if (id === MY_ID) {
      placeCard.querySelector('button').style.display = "block";
    }
    likeMassive.forEach(card => {
    if (card._id === MY_ID) {
      placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }});
    return placeCard
  }

  _setEventListeners() {
    this.element.querySelector('.place-card__like-icon').addEventListener('click', this._like);
    this.element.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
  }

}
