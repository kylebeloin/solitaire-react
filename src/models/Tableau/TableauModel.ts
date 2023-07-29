import { PileModel, PileType, CardModel } from "..";
import type { ITableauModel } from "./ITableauModel";

export class TableauModel extends PileModel implements ITableauModel {
  constructor(cards: CardModel[]) {
    super([], PileType.Tableau);
    this.Deal(cards);
  }

  public Deal(cards: CardModel[]): void {
    console.log("dealing cards", cards);
    this.Add(cards);
    this.Cards[this.Cards.length - 1].Flip();
  }

  public FaceUp(): CardModel[] {
    return this.Cards.filter((card) => card.Revealed);
  }

  public Pick(number: number, flip?: boolean): CardModel[] {
    const card = super.Pick(number, flip);
    if (this.Cards.every((card) => !card.Revealed)) {
      this.Cards[this.Cards.length - 1]?.Flip();
    }
    return card;
  }

  public CanAdd(card: CardModel[]): boolean {
    const firstCard = card[0];
    if (this.Cards.length === 0) return firstCard.Rank == 13;
    const lastCard = this.Cards[this.Cards.length - 1];

    return (
      parseInt(lastCard.Suit.Suit.toString()) % 2 !=
        parseInt(firstCard.Suit.Suit.toString()) % 2 &&
      parseInt(firstCard.Rank.toString()) ===
        parseInt(lastCard.Rank.toString()) - 1
    );
  }
}

export default TableauModel;
