import { IPileModel } from "./IPileModel";
import { PileType } from "./PileType";
import { Pile } from ".";
import { CardModel } from "../Card";
import uuid4 from "uuid4";

export class PileModel extends Pile implements IPileModel {
  private _cards: Array<CardModel> = [];
  public id: string = uuid4();
  public type: PileType = PileType.None;
  public created: boolean = false;

  constructor(cards: Array<CardModel> = [], type: PileType = PileType.None) {
    super();
    this.type = type;
    this._cards = cards;
  }

  get Cards(): Array<CardModel> {
    return this._cards;
  }

  set Cards(cards: Array<CardModel>) {
    this._cards = cards;
  }

  public Add(card: Array<CardModel> | undefined): void {
    if (card) this._cards.push(...card);
  }

  /**
   * @description Picks a number of cards from the pile
   * @param number
   * @param flip
   * @returns {CardModel}
   */
  public Pick(number: number, flip: boolean = false): CardModel[] {
    return this.Cards.splice(this.Cards.length - number, number);
  }
}

export default PileModel;
