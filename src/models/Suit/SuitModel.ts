import { Suit, Suits, Colors } from ".";

export default class SuitModel {
  private _suit: Suit;

  constructor(suit: Suit) {
    this._suit = suit;
  }

  get Suit(): Suit {
    return this._suit;
  }

  get Icon(): string {
    return Suits[this._suit].name;
  }

  get Color(): Colors {
    return Suits[this._suit].color;
  }
}
