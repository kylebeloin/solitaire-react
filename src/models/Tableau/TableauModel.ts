import { PileModel, PileType, CardModel } from "..";
import type { ITableauModel } from "./ITableauModel";

export class TableauModel extends PileModel implements ITableauModel {
  constructor(cards: CardModel[]) {
    super([], PileType.Tableau);
    this.type = PileType.Tableau;
    this.Deal(cards);
  }

  public Deal(cards: CardModel[]): void {
    this.Add(cards);
    this.Cards[this.Cards.length - 1].Flip();
  }

  /**
   * Finds the index of faceup cards, and returns the cards from that index
   * @returns
   */
  public FaceUp(): Array<CardModel> {
    return this.Cards.filter((card) => card.Revealed);
  }

  public Pick(number: number): CardModel[] {
    const card = super.Pick(number);
    /**
     * If every card is face down and there is more than one card left, flip the last card
     */
    if (this.Cards.every((card) => !card.Revealed) && this.Cards.length > 0) {
      this.Cards[this.Cards.length - 1]?.Flip();
    }
    return card;
  }

  public CanAdd(card: CardModel[]): boolean {
    if (card.length === 0) return true;
    let firstCard = card[0];
    if (this.Cards.length === 0) return firstCard.Rank == 13;
    let lastCard = this.Cards[this.Cards.length - 1];

    return (
      parseInt(lastCard.Suit.Suit.toString()) % 2 !=
        parseInt(firstCard.Suit.Suit.toString()) % 2 &&
      parseInt(firstCard.Rank.toString()) ===
        parseInt(lastCard.Rank.toString()) - 1
    );
  }
}

export default TableauModel;
