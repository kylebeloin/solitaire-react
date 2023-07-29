import { Rank, Suit, SuitModel, RankName, Ranks } from "..";
import { ICardModel } from "./ICardModel";

export default class CardModel implements ICardModel {
  private _rank: Rank;
  private _suit: SuitModel;
  private _revealed: boolean = false;

  constructor(rank: Rank, suit: Suit) {
    this._rank = rank;
    this._suit = new SuitModel(suit);
  }

  get Revealed(): boolean {
    return this._revealed;
  }

  get Name(): RankName {
    return Ranks[this._rank];
  }

  get Rank(): Rank {
    return this._rank;
  }

  get Suit(): SuitModel {
    return this._suit;
  }

  public Flip(): CardModel {
    this._revealed = !this._revealed;
    return this;
  }
}
