import type { IFoundationModel } from "./IFoundationModel";
import { CardModel, PileModel, PileType, SuitValue } from "..";

export class FoundationModel extends PileModel implements IFoundationModel {
  public Suit: SuitValue;

  constructor(suit: SuitValue) {
    super([], PileType.Foundation);
    this.Suit = suit;
    this.type = PileType.Foundation;
  }

  public IsComplete() {
    return this.Cards.length === 13;
  }

  public CanAdd(card: CardModel) {
    if (this.Cards.length === 0) {
      return card.Rank == 1 && card.Suit.Suit === this.Suit;
    }
    const topCard = this.Cards[this.Cards.length - 1];
    return (
      card.Suit.Suit === topCard.Suit.Suit &&
      parseInt(card.Rank.toString()) ===
        parseInt(this.Cards[this.Cards.length - 1].Rank.toString()) + 1
    );
  }
}

export default FoundationModel;
