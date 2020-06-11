'use strict';
export default class CardList {
  constructor(container, initial) {
    this.container = container;
    this.initial = initial;
  }

  addCard(card) {
    this.container.appendChild(card);
  }

  render() {
    this.initial.forEach((card) => this.addCard(card));
  }
}
