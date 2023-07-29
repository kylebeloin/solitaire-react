import { IPileModel } from "./IPileModel";
import { PileType } from "./PileType";
import { CardModel } from "../Card";
import uuid4 from "uuid4";

export class PileModel implements IPileModel {
  public _cards: CardModel[] = [];
  public id: string = uuid4();
  public type: PileType = PileType.None;
  public created: boolean = false;

  constructor(cards: CardModel[] = [], type: PileType = PileType.None) {
    this.type = type;
    this._cards = cards;
  }

  get Cards(): CardModel[] {
    return this._cards;
  }

  set Cards(cards: CardModel[]) {
    this._cards = cards;
  }

  public Add(card: CardModel[]): void {
    this._cards.push(...card);
  }

  public Pick(number: number, flip: boolean = false): CardModel[] {
    const picked = [];
    for (let i = 0; i < number; i++) {
      const card = this._cards.pop();

      if (card) {
        picked.push(flip ? card.Flip() : card);
      }
    }
    return picked;
  }
}

export default PileModel;
