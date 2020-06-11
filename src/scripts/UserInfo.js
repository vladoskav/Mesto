'use strict';

export default class UserInfo {
  constructor(infoName, infoAbout) {
    this.infoName = infoName;
    this.infoAbout = infoAbout;
  }

  setUserInfo(name, about) {
    this.infoName.textContent = name;
    this.infoAbout.textContent = about;
  }

  updateUserInfo(popupName, popupAbout) {
    this.setUserInfo(popupName, popupAbout);
  }
}
