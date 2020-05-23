'use strict';
// переменные
const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
};
const placesList = document.querySelector('.places-list');
const popupEdit = document.querySelector('.popup_edit');
const userButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');
const form = document.forms.new;
const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
const popupImage = document.querySelector('.popup_image');
const contentImage = document.querySelector('.popup__content_image');
const popupCard = document.querySelector('.popup__card');
const popupAvatar = document.querySelector('.popup_avatar');
const popupCloseAvatar = document.querySelector('.popup__close_avatar');
const avatarButton = document.querySelector('.user-info__photo');
const popupCloseCard = document.querySelector('.popup__close');
const popupCloseEdit = document.querySelector('.popup__close_edit');
const popupCloseImage = document.querySelector('.popup__close_image');
const infoName = document.querySelector('.user-info__name');
const infoAbout = document.querySelector('.user-info__job');
const infoAvatar = document.querySelector('.user-info__photo');
const { name, about } = formEdit.elements;
const { avatar } = formAvatar.elements;
const MY_TOKEN = '92d946f9-5297-4a9a-bbd3-7a60c94b3c9f';
const MY_URL = 'https://praktikum.tk/cohort10';
const MY_ID = "1efaef5b38d89184686eacbe";
// Экземпляры попапов:
const openCard = new Popup(popupCard, popupCloseCard);
const openEdit = new Popup(popupEdit, popupCloseEdit);
const openImage = new Popup(popupImage, popupCloseImage);
const openAvatar = new Popup(popupAvatar, popupCloseAvatar);
// Экзмепляр изменения инфо
const edit = new UserInfo(infoName, infoAbout);

// Запросы к серверу
const infoApi = new Api(MY_TOKEN, MY_URL);

// Заполнение информации о пользователе с сервера
infoApi.getInfo()
    .then(res => {
      infoAbout.textContent = res.about;
      infoName.textContent = res.name;
      infoAvatar.style.backgroundImage = `url(${res.avatar})`;
    });

// Запрос массива карточек
infoApi.getInitialCard()
    .then(res => {

        const cardsMassive = res.map((card) => new Card(card.name, card.link, card.likes.length, card.owner._id, card._id, card.likes).element);
        const cardList = new CardList(placesList, cardsMassive);

        cardList.render();
    });

// Функции:

// Функция открытия картинки
function image(event) {
  if (event.target.classList.contains('place-card__image')) {
    openImage.open();
    contentImage.src = event.target.dataset.url
  }
}
// Функция изменения аватара
function editAvatar(event) {
    event.preventDefault();
    document.querySelector('.popup__button_avatar').textContent = "Загружается...";

    infoApi.updateInfo("", "", "avatar", avatar.value)
        .then(res => {
            infoAvatar.style.backgroundImage = `url(${res.avatar})`;
            openAvatar.close();
            document.querySelector('.popup__button_avatar').textContent = "Сохранить";
        });

}
// Функция добавления карточки
function createCard(event) {

  event.preventDefault();
  const { name, link } = form.elements;
  document.querySelector('.popup__button').textContent = "Загружается...";
    document.querySelector('.popup__button').style.fontSize = "18px";
    infoApi.postNewCard(name.value, link.value)
      .then(res => {
          const newCard = new Card(name.value, link.value, res.likes.length, res.owner._id, res._id, res.likes).element;
          placesList.appendChild(newCard);
          openCard.close();
          document.querySelector('.popup__button').textContent = "+";
          document.querySelector('.popup__button').style.fontSize = "36px";
      });


}

// Функция изменения профайла
function editProfile(event) {
    event.preventDefault();
    document.querySelector('.popup__button_edit').textContent = "Загружается...";

    infoApi.updateInfo(name.value, about.value, "", "")
        .then(res => {
            edit.updateUserInfo(res.name, res.about);
            openEdit.close();
            document.querySelector('.popup__button_edit').textContent = "Сохранить";

        });



}

// Валидация
const valid = new FormValidator(form, errorMessages);

const validEdit = new FormValidator(formEdit, errorMessages);

const validAvatar = new FormValidator(formAvatar, errorMessages);

// Слушатели событый:

form.addEventListener('submit', createCard);

formEdit.addEventListener('submit', editProfile);

formAvatar.addEventListener('submit', editAvatar);

userButton.addEventListener('click', () => openCard.open());

editButton.addEventListener('click', () => openEdit.open());

avatarButton.addEventListener('click', () => openAvatar.open());

placesList.addEventListener('click', image);

/*
 Что понравилось:
 - Выполнено задание с добавлением карточки
 - Отображается количество лайков, есть возможность их проставить и удалить.
 - Есть возможность обновить аватар
 Можно лучше:
 - В API.js есть небольшой беспорядок в стиле кода. Где-то пропущен пробел, не перенесена фигурная скобочка и т.д.
 - Перенести функции в script.js по классам
 - Разобраться со способом построения класса API на async/await
 Полезные материалы:
 Статья про построение async/await API на английском https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp
 */
